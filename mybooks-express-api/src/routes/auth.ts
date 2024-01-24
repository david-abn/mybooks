import { auth, googleAuth } from "../auth/lucia.ts";
import { Router, Request, Response } from 'express';
import { parseCookie } from "lucia/utils";
import { OAuthRequestError } from "@lucia-auth/oauth";

const router = Router();

router.get("/login/google", async (req, res) => {
	const [url, state] = await googleAuth.getAuthorizationUrl();
	res.cookie("google_oauth_state", state, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		path: "/",
		maxAge: 60 * 60 * 1000 // 1 hour
	});
	return res.status(302).setHeader("Location", url.toString()).end();
});

router.get("/login/google/callback", async (req, res) => {
	const cookies = parseCookie(req.headers.cookie ?? "");
	const storedState = cookies.google_oauth_state;
	const state = req.query.state;
	const code = req.query.code;
	// validate state
	if (
		!storedState ||
		!state ||
		storedState !== state ||
		typeof code !== "string"
	) {
		return res.sendStatus(400);
	}
	try {
		const { getExistingUser, googleUser, createUser } =
			await googleAuth.validateCallback(code);

		const getUser = async () => {
			const existingUser = await getExistingUser();
			if (existingUser) return existingUser;
			const user = await createUser({
				attributes: {
					username: googleUser.email
				}
			});
			return user;
		};

		const user = await getUser();
		const session = await auth.createSession({
			userId: user.userId,
			attributes: {}
		});
		const authRequest = auth.handleRequest(req, res);
		authRequest.setSession(session);
		return res.status(302).setHeader("Location", "/").end();
	} catch (e) {
		if (e instanceof OAuthRequestError) {
			// invalid code
			return res.sendStatus(400);
		}
		return res.sendStatus(500);
	}
});

router.post("/logout", async (req, res) => {
	const authRequest = auth.handleRequest(req, res);
	const session = await authRequest.validate();
	if (!session) {
		return res.sendStatus(401);
	}
	await auth.invalidateSession(session.sessionId);
	authRequest.setSession(null);
	// redirect back to login page
	return res.status(302).setHeader("Location", "/login").end();
});

router.get("/user", async (req, res) => {
	const authRequest = auth.handleRequest(req, res);
	const session = await authRequest.validate();
	if (session) {
		const user = session.user;
		const username = user.username;
		// ...c
		console.log(username);
		console.log(user);
	}
	// ...
});


export default router;
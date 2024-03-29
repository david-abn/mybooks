export default function Hero() {
    return (
        <div className="py-20" style={{ background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)' }}
        >
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold mb-2 text-white">
                    Start building your digital bookshelf
                </h2>
                <h3 className="text-2xl mb-8 text-gray-200">
                    Never forget what you have read again
                </h3>

                <button className="bg-black font-bold rounded-full py-4 px-8 shadow-lg uppercase tracking-wider">
                    Login to get started
                </button>
            </div>
        </div>
    )
}


const profile = () => {
  return (
    <section className="bg-softWhite min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4">

            {/* Heading Section  */}
            <div className="title-section mb-16">
                <h1 className="h1-primary">Admin Dashboard</h1>
                <p className="font-oswald text-2xl text-darkGray mt-4">Welcome</p>
            </div>

            {/* Admin Controls  */}
            <div className="bg-softWite rounded-lg shadow-lg p-8 border border-deepBlue/20">
                <h2 className="font-oswald text-2xl text-darkGray mb-8 pb-4 border-b border-deepBlue/30">Admin Controls</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <a href="/" className="btn-primary text-center">Home Page</a>
                    <a href="/books/new" className="btn-secondary text-center">Add a new book</a>
                    <a href="/books" className="btn-secondary text-center">Manage Books</a>
                    <a href="/reviews" className="btn-secondary text-center">Manage Reviews</a>
                </div>
            </div>
        </div>
    </section>
  )
}

export default profile
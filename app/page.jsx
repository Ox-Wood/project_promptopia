import Feed from '@components/Feed';

const Home = () => {
  return (
     <section className="w-full flex-center flex-col"> 
        <h1 className="head_text text-center">
            Discover & Share
            <br/>
            <span className="orange_gradient text-center">your thoughts freely</span>
        </h1>
        <p className="desc text-center">
            Shareopia is an open-source platform for modern world to discover, create and share creative thoughts
        </p>
        {/* Feed */}
        <Feed />
     </section>
  )
}

export default Home
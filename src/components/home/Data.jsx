
function Data(props) {
    return (
        <div className="home__data">
            <h1 className="home__title">
                Saad Zubairi
            </h1>
            <h3 className="home__subtitle">
                Software Developer
            </h3>
            <p className="home__description">
                A Full Stack Designer and Developer Transforming Ideas into Reality with Innovative Software Solutions.
            </p>
            <div className="home_buttons_list">
                <a href="/Portfolio" className="button button--flex">
                    <i class="bx bxs-component"></i>  View Portfolio
                </a>
                <a href="#Contact" className="button_ol button--flex">
                    <i class="uil uil-message"></i>  Let's Connect!
                </a>
            </div>
        </div>
    );
}
export default Data
import './About.css'
import SideNav from '../../components/SideNav/SideNav'

export default function About(){
    return(
        <>
        <SideNav/>
        <div class="containerAbout">
        <section>
            <div class = "image">
            </div>

            <div class = "content text-align-center">
                <h2>About Us</h2>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing  Nobis aspernatur voluptas inventore ab voluptates nostrum minus illo laborum harum laudantium earum ut, temporibus fugiat sequi explicabo facilis unde quos corporis!</p>

                <ul class = "links">
                    <li><a href = "#">work</a></li>

                    <div class = "vertical-line"></div>

                    <li><a href = "#">service</a></li>

                    <div class = "vertical-line"></div>
                    
                    <li><a href = "#">contact</a></li>
                </ul>

                <ul class = "icons">
                    <li>
                    <i class='bx bxl-facebook-square'></i>
                    </li>
                    <li>
                    <i class='bx bxl-twitter'></i>
                    </li>
                    <li>
                    <i class='bx bxl-instagram'></i>
                    </li>
                    <li>
                    <i class='bx bxl-youtube'></i>
                    </li>
                </ul>
            </div>
        </section>
        </div>
        </>
    )
}
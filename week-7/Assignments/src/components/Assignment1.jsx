import './Assignment1.css'
import profilepic from '/src/assets/profile-image.jpg'
export function Assignment1() {
    return <div id="parent" >
        <div id="container">
            <div id="header">
                <div id="profilePic">
                    <img src={profilepic} alt="" />
                </div>
            </div>
            <div id="body"> <strong class='body-items'>Rita Correia</strong> <span class='body-items'>32</span> <span class='body-items'>London</span></div>
            <div id="footer"></div>
        </div>
    </div>
}
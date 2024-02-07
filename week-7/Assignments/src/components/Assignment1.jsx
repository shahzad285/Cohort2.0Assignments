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
            <div id="body">
                <div="details">
                    <strong class='body-items'>Rita Correia</strong>
                    <span class='body-items'>32</span>
                </div>

                <span class='body-items'>London</span>
            </div>
            <div id="footer">
                <div class="footer-content">
                    <strong>80K</strong>
                    <span>Followers</span>
                </div>
                <div class="footer-content">
                    <strong>803K</strong>
                    <span>Likes</span>
                </div>
                <div class="footer-content">
                    <strong>1.4K</strong>
                    <span>Photos</span>
                </div>
            </div>
        </div>
    </div>
}
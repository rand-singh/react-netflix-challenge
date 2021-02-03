import React from 'react'
import './Banner.scss'

function Banner() {
    const truncate = (string, n) => {
        return string?.length> n ? string.substring(0, n - 1) + '...' : string;
    }

    return (
        <header className="banner" style={{
            backgroundSize: "cover",
            backgroundImage: `url(https://png.pngtree.com/thumb_back/fw800/back_our/20190625/ourmid/pngtree-twisted-lines-black-banner-background-image_262533.jpg)`,
            backgroundPosition: "center center"
        }}>
            <div className="banner__contents">
                <h1 className="banner__title">Movie Name</h1>
                <div className="banner__buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My List</button>
                </div>
                <h1 className="banner__description">
                    {truncate(`This is a test description This is a test description This is a test description This is a test description This is a test description This is a test description This is a test description This is a test description `, 150)}</h1>
            </div>

            <div className="banner--fadeBottom"/>
        </header>
    )
}

export default Banner

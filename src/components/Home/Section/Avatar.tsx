import React from "react";

const Avatar = () => {
    const styles = {
        width: "320px",
        height: "320px",
        backgroundImage: "url('https://unicorn.js.org/images/profile/avatar0001.jpg')", // 头像url
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "320px 320px 120px 180px",
    };

    return <div style={styles}></div>;
};

export default Avatar;

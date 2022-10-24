// import React from "react"

// const LikeAndShare = (props) => {
    
//     initFacebookSDK() {
//         if(window.FB){
//             window.FB.XFBML.parse()
//         }

//         window.fbAsyncInit = function() {
//             window.FB.init({
//                 appId: process.env.REACT_APP_FACEBOOK_APP_ID, 
//                 cookies: true,
//                 xfbml: true,
//                 version: 'v2.5'
//             });
//         };

//         (function (d, s, id) {
//             var js, fjs = d.getElementsByTagName(s)[0];
//             if (d.getElementById(id)) return;
//             js = d.createElement(s); js.id = id;
//             js.src= `//connect.facebook.net/vi_VN/sdk.js`;
//             fjs.parentNode.insertBefore(js, fjs);
//         }(document, 'script', 'facebook-jssdk')); 
//     }

//     componentDidMount() {
//         this.initFacebookSDK();
//     }

//     let { dataHref } = this.props

//     return (
//         <>
//             <div className="fb-like"
//                 data-width={dataHref}
//                 data-layout="standard" 
//                 data-action="like" 
//                 data-size="small" 
//                 data-share="true">
//             </div>
//         </>
//     )
// } 
// export default LikeAndShare
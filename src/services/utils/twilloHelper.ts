import APIKit from './axiosHelper';

// const AccessToken = require('twilio').jwt.AccessToken;
// const VideoGrant = AccessToken.VideoGrant;

// // Substitute your Twilio AccountSid and ApiKey details
// var ACCOUNT_SID = 'SK339c27cc1d85db9911e5b3e9d63888e6';
// var API_KEY_SID = 'HappyGP';
// var API_KEY_SECRET = 'yPZEdLq07kg5PHs2FeqF3oq3pt8dNhPD';

// const generateToken = (identity?: string, roomName?: string) => {
//     const videoGrant = new VideoGrant({
//         room: roomName ? roomName : 'Guest Room',
//     });

//     // Create an Access Token
//     const token = new AccessToken(ACCOUNT_SID, API_KEY_SID, API_KEY_SECRET);

//     // Grant access to Video
//     token.addGrant(videoGrant);

//     // Set the Identity of this token
//     token.identity = identity ? identity : 'Guest';

//     // Serialize the token as a JWT
//     console.log(token.toJwt());
//     return token.toJwt();
// };

export const getTokenHelper = (appointmentId: number, identity: string, roomName: string) => {
    console.log(
        `/appointments/${appointmentId}/video-call-token/?identity=${identity}&roomName=${roomName}`
    );

    return APIKit.get(
        `/appointments/${appointmentId}/video-call-token/?identity=${identity}&roomName=${roomName}`
    )
        .then((res) => {
            return res.data.data.token;
        })
        .catch((e) => {
            console.log(e.response.data);
            return '';
        });
};

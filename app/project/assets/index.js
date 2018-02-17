/**
 * 首页图标
 */
const Home = {
    work: require('./images/home.png'),
    work_selected: require('./images/home_selected.png'),
    contact: require('./images/contact.png'),
    contact_selected: require('./images/contact_selected.png'),
    message: require('./images/mailbox.png'),
    message_selected: require('./images/mailbox_selected.png'),
    social: require('./images/social.png'),
    social_selected: require('./images/social_selected.png'),
    me: require('./images/user.png'),
    me_selected: require('./images/user_selected.png'),
};
const H5 = {
    map: require('./html/map/index.html'),
    resume: require('./html/resume/index.html')
};
const Me = {
    avatar: require('./images/avatar.jpeg'),
    Images: [
        require('./images/img1.png'),
        require('./images/img2.png'),
        require('./images/img3.png'),
        require('./images/img4.png'),
        require('./images/img5.png'),
        require('./images/img6.png'),
        require('./images/img7.png'),
        require('./images/img8.png'),
        require('./images/img9.png'),
        require('./images/img10.png'),
        require('./images/img11.png'),
        require('./images/img12.png'),
    ]
};

export {
    Home,
    H5,
    Me
}

export * from './str'

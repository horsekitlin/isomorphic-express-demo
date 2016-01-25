import keyMirror from 'keymirror'

const Constants = {
    USER_LOGOUT : '會員登出',
    USER_LOGIN : '會員登入',
    POSTS_LIKE_POST : '加入喜歡的文章',
    POSTS_CANCLE_LIKE_POST : '移除喜歡的文章',
    POSTS_GET_LIST : '取回文章列表',
    POSTS_NEXT_PAGE : 'FB下一頁文章',
    FANS_GET_LIST : '取回粉絲團列表',
    FANS_LIKE_FANS : '收藏粉絲團',
    FANS_UNLIKE_FANS : '收回收藏粉絲團',
    FANS_GET_NEXTPAGE : '粉絲團下一頁',
    TAGS_FAVOR_TAGS : '取回最喜歡的tags',
    TAGS_GET_POSTS : '依照tag取回文章列表',
};

export default keyMirror(Constants);

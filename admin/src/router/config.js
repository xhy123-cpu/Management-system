import Home from '@/views/home/Home.vue'
import Center from '@/views/center/Center.vue'
import UserAdd from '@/views/user-manage/UserAdd.vue'
import UserList from '@/views/user-manage/UserList.vue'
import NewsAdd from '@/views/news-manage/NewsAdd.vue'
import NewsList from '@/views/news-manage/NewsList.vue'
import ProductAdd from '@/views/product-manage/ProductAdd.vue'
import ProductList from '@/views/product-manage/ProductList.vue'
import NotFound from '@/views/notfound/NotFound.vue'
import NewsEdit from '@/views/news-manage/NewsEdit.vue'
import ProductEdit from '@/views/product-manage/ProductEdit.vue'

const routes=[
    {
        path:'/index',
        component:Home
    },
    {
        path:'/center',
        component:Center
    },
    {
        path:'/user-manage/useradd',
        component:UserAdd,
    },
    {
        path:'/user-manage/userlist',
        component:UserList,
    },
    {
        path:'/news-manage/newsadd',
        component:NewsAdd
    },
    {
        path:'/news-manage/editnews/:id',
        component:NewsEdit
    },
    {
        path:'/product-manage/editproduct/:id',
        component:ProductEdit
    },
    {
        path:'/news-manage/newslist',
        component:NewsList
    },
    {
        path:'/product-manage/productadd',
        component:ProductAdd
    },
    {
        path:'/product-manage/productlist',
        component:ProductList
    },
    {
        path:'/',
        redirect:'/index'
    },
    {
        path:'/:pathMatch(.*)*',
        name:'NotFound',
        component:NotFound
    }
]

export default routes
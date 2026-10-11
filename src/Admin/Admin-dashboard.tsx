import { useEffect, useState } from "react"
import type { VideoContract } from "../contracts/videosContracts"
import axios  from "axios"
import  type { CategoryContract } from "../contracts/categoryContracts"
import { useFormik } from "formik"


export function AdminDashBoard(){

     const [videos,setVideos] = useState<VideoContract[]>([])
     const [categories,setCategories] = useState<CategoryContract[]>([])

     function LoadCategories(){
        axios.get('http://127.0.0.1:6060/categories')
        .then(response=>{
            response.data.unshift({category_id:-1,category_name:'select video category'})
            setCategories(response.data)
        })
     }

     function LoadVideos(){
       axios.get('http://127.0.0.1:6060/videos')
       .then(response=>{
        setVideos(response.data)
       })
     }

     
    

 const addVideoForm = useFormik({
    initialValues:{
        video_id:0,
        title:'',
        description:'',
        url:'',
        likes:0,
        views:0,
        comments:'',
        category_id:0,
    
    },
    onSubmit:(video)=>{
        axios.post('http://127.0.0.1:6060/add-video',video)
        .then(()=>{
            alert('Video Added')
            LoadVideos()
        })

    },
    enableReinitialize:true
 })

     useEffect(()=>{
        LoadVideos()
        LoadCategories()
     },[])

function hanleDeleteClick(id: number){
    let flag =window. confirm(`are you deleteed this video `)
    if(flag===true){
        axios.delete(`http://127.0.0.1:6060/delete-video/${id}`)
        .then(()=>{
            alert("video as ben deleted successfully")
            LoadVideos()
        })
    }

}


     
    return(
        <div  className="container-fluid row">
            <div className="col-3">
            <h2>Admin Dash board</h2>
            <button data-bs-toggle="modal" data-bs-target="#new" className="btn btn-primary">New video</button>
            <div className="modal fade" id="new">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>new video</h2>

                        </div>
                        <div className="modal-body">
                           <form  onSubmit={addVideoForm.handleSubmit}>
                             <dl>
                                <dt>Video Id</dt>
                                <dd><input type="text"  name="video_id" onChange={addVideoForm.handleChange}/></dd>
                                <dt>title</dt>
                                <dd><input type="text" name="title" onChange={addVideoForm.handleChange} /></dd>
                                <dt>description</dt>
                                <dd>
                                    <textarea rows={4} cols={40} name="description" onChange={addVideoForm.handleChange}></textarea>
                                </dd>
                                <dt>URL</dt>
                                <dd><input type="text"name="url"onChange={addVideoForm.handleChange} /></dd>
                                <dt>Likes</dt>
                                <dd><input type="number" name="likes" onChange={addVideoForm.handleChange} /></dd>
                                <dt>comments</dt>
                                <dd><input type="text" name="comments" onChange={addVideoForm.handleChange}  /></dd>
                                <dt>Views</dt>
                                <dd><input type="number" name="views" onChange={addVideoForm.handleChange} /></dd>
                                <dt>category</dt>
                                <dd>
                                    <select onChange={addVideoForm.handleChange} name="category_id">
                                        {categories.map(category=><option key={category.category_id} value={category.category_id}>{category.category_name.toUpperCase()}</option>)}

                                    </select>
                                </dd>
                                </dl>
                                    <button type="submit" className="btn btn-success" data-bs-dismiss="modal">Add</button>
                           </form>
                        </div>
                        
                    </div>
                </div>

            </div>
        </div>
        <div className="col-9">

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Videos Title</th>
                        <th>Preview</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {
                    videos.map(video=>
                        <tr key={video.video_id}>
                        <td>{video.title}</td>
                        <td>
                        <iframe src={video.url} width="200" height="200"></iframe>

                        </td>
                        <td><button className="btn btn-warning bi bi-pen-fill"></button>
                      
                        <button onClick={()=>hanleDeleteClick(video.video_id)} className="btn btn-danger bi bi-trash-fill mx-3"></button> </td>
                        </tr>
                    )
                }

                </tbody>

            </table>

        </div>
        </div>
    )
}
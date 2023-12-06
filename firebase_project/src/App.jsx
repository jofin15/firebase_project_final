
import { useEffect, useState } from "react";
import { Auth } from "./components/Auth"
import "./App.css"
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db,auth, storage} from "./config/conf";
import { ref, uploadBytes } from "firebase/storage";
getDocs
function App() {
  const [movieList, setMovieList] = useState([]);

  //new movie state
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);

  //update title state
  const [updateMovieTitle,setUpdatedTitle]=useState("")

  //file upload state
  const [fileUpload,setFileUpload]=useState(null)

  const moviesCollectionRef=collection(db,"movies")

  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const onSubmitMovie=async()=>{
    try {
      await addDoc(moviesCollectionRef,{
        title:newMovieTitle,
        releaseDate:newReleaseDate,
        recievedAnOscar:isNewMovieOscar,
        userId:auth?.currentUser?.uid
        
      })
    } catch (error) {
      console.error(error)
    }
  }

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
  };

  const updatedMovieTitle=async(id)=>{
    const movieDoc=doc(moviesCollectionRef,id)
    await updateDoc(movieDoc,{title:updateMovieTitle})
  }

  const uploadFile=async()=>{
    if (!fileUpload)return;
    const filesFolderRef=ref(storage,`projectFolder/${fileUpload.name}`)
    try {
      await uploadBytes(filesFolderRef,fileUpload)
    } catch (error) {
      console.error(error)
    }

  }

  return <div className="App">
    <Auth />

    <div>
    <input
          placeholder="Movie title..."
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />

    <input
          placeholder="Release Date..."
          type="number"
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
        />

    <input
          type="checkbox"
          checked={isNewMovieOscar}
          onChange={(e) => setIsNewMovieOscar(e.target.checked)}
        />
        <label> Received an Oscar</label>
        <button onClick={onSubmitMovie}> Submit Movie</button>
    </div>

    <div>
      {movieList.map((movie)=>(
        <div>
          <h1 style={{ color: movie.recievedAnOscar ? "green" : "red" }}>
              {movie.title}
          </h1>
          <p>Date: {movie.releaseDate}</p>
            <button onClick={() => deleteMovie(movie.id)}> Delete Movie</button>

            <input type="text" placeholder="new Title ..." onChange={(e)=>setUpdatedTitle(e.target.value)} />
            <button onClick={()=>updatedMovieTitle(movie.id)}>Update Movie Title</button>
        </div>
      ))}
    </div>

    <div>
      <input type="file" onChange={(e)=>setFileUpload(e.target.files[0])} />
      <button onClick={uploadFile}>Upload File</button>

    </div>
  </div>
}
export default App
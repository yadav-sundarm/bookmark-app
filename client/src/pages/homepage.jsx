import { useEffect, useState } from 'react';
import { createBookmark, deleteBookmark, fetchBookmarks } from '../services/api.js';

const Homepage = () => {
    const [bookmarks, setBookmarks] = useState([])
    const [title, setTitle] = useState("")
    const [url, setUrl] = useState("")
    const [tags, setTags] = useState([])

    useEffect(() => {
        const getBookmarks = async () => {
            const data = await fetchBookmarks()
            setBookmarks(data)
        }
        getBookmarks()
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault()
        const fixedUrl = url.startsWith("http") ? url : `https://${url}`;
        const newBookmark = { title, url: fixedUrl, tags }
        try {
            const createdBookmark = await createBookmark(newBookmark)
            setBookmarks([...bookmarks, createdBookmark])
            setTitle("")
            setUrl("")
            setTags([])
        } catch (error) {
            console.error("Error creating bookmark:", error)
        }
    }

    const handleDelete = async (id) => {
        try {
            await deleteBookmark(id);
            setBookmarks(bookmarks.filter(b => b._id !== id))
        } catch (error) {
            console.error("Error deleting bookmark:", error)
        }
    }
    return (
        <div className="page-layout">
            <div className="Bookmark-container">
                {bookmarks.map((bookmark) => (
                    <div key={bookmark._id} className="Bookmark">
                        <h2>{bookmark.title}</h2>
                        <p><a href={bookmark.url} target="_blank" rel="noopener noreferrer">
                            Visit Site
                        </a></p>
                        <p>Tags: {(bookmark.tags || []).join(", ")}</p>
                        <button onClick={() => handleDelete(bookmark._id)}>Delete</button>
                    </div>
                ))}
            </div>
            <div className="Bookmark-form">
                <h1>Add a Bookmark</h1>
                <form onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="url">URL:</label>
                        <input
                            type="url"
                            id="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </div>
                    <div>
                        {['work', 'study'].map((tag) => (
                            <label key={tag}>
                                <input
                                    type="checkbox"
                                    checked={tags.includes(tag)}
                                    onChange={(e) => {
                                        if (e.target.checked) setTags([...tags, tag])
                                        else setTags(tags.filter(t => t !== tag))
                                    }}
                                />
                                {tag}
                            </label>
                        ))}
                    </div>
                    <button type="submit">Add Bookmark</button>
                </form>
            </div>
        </div>
    )
};

export default Homepage;
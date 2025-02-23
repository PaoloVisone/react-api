import { useState, useEffect } from "react";

// Importo axios
import axios from "axios"

// Variabile iniziale dell'articolo
const articleData = {
    id: "",
    title: "",
    image: "",
    content: "",
    tags: []
}

// export default function input() {

const Input = () => {

    // Stato dell'articolo (gestisce l'arrey di articoli)
    const [articles, setListArticles] = useState([]);
    // Inserimento nuovo articolo
    const [newArticle, setNewArticle] = useState(articleData);


    // funzione di gestione chiamata all'API
    function fetchArticles() {
        axios.get("http://localhost:3000/posts")
            .then((res) =>
                setListArticles(res.data))
    }
    // richiamo la funzione di richiesta dati al caricamento del componente
    useEffect(fetchArticles, []);


    //Funzione per gestire i campi 
    function handleData(e) {
        // gestione del value a seconda del tipo di input
        const value = e.target.title === "tags" ? e.target.value.split(",") : e.target.value;

        setNewArticle((currentNewArticle) => ({
            ...currentNewArticle,
            [e.target.title]: value,
        }));
    }

    // Funzione il submit del form
    function handleSubmit(e) {
        e.preventDefault();

        // chiamata verso la API in post con invio dati nuova pizza
        axios.post("http://localhost:3000/posts", newArticle)
            .then((res) => {
                // uso la risposta dell'API per creare il nuovo array
                setListArticles((articles) => [...articles, res.data])
            }
            )
            .catch(err => console.log(err))


        // setListArticles(
        //     (articles) =>
        //         [...articles,
        //         {
        //             id: articles.length === 0 ? 1 : articles[articles.length - 1].id + 1,
        //             ...newArticle
        //         }
        //         ]
        // );

        // resetto il form
        setNewArticle(articleData);
    }

    // Cancello articolo
    function deleteArticle(idArticle) {
        const updatedArticle = articles.filter(
            (article) => {
                return article.id !== idArticle
            }
        );
        setListArticles(updatedArticle);
    }

    // Articoli
    return (
        <>
            <div id="content">

                <div id="input-box">

                    <h1>INSERISCI IL TUO ARTICOLO</h1>

                    <form action="#" onSubmit={handleSubmit}>

                        <input
                            type="text"
                            title="title"
                            value={newArticle.title}
                            onChange={handleData}
                            placeholder="Titolo"
                            required
                        />

                        <input
                            type="text"
                            title="image"
                            value={newArticle.image}
                            onChange={handleData}
                            placeholder="Imagine"
                        />

                        <input
                            type="text"
                            title="tags"
                            value={newArticle.tags}
                            onChange={handleData}
                            placeholder="Tags"
                        />

                        <textarea
                            type="text"
                            title="content"
                            value={newArticle.content}
                            onChange={handleData}
                            placeholder="Contenuto..."
                            required
                        ></textarea>

                        <div id="button">
                            <button className="btn">Genera</button>
                        </div>
                    </form>
                </div>


                {/* //lista dei articoli */}

                {/* Se non ci sono articoli */}

                {
                    articles.length === 0 ?
                        <h2>Non ci sono articoli</h2>
                        :
                        <div id="content-art">
                            {articles.map((article) => (

                                <div className="article-list" key={article.id}>

                                    <h3>{article.title}</h3>
                                    <img src={article.image} alt={article.title} />
                                    <p>{article.content}</p>
                                    <span>{article.tags.join(", ")}</span>

                                    {/* Delete button */}
                                    <div className="content-btn">
                                        <button className="btn" onClick={() => deleteArticle(article.id)}>
                                            Elimina
                                        </button>
                                    </div>

                                </div>
                            ))
                            }
                        </div>
                }
            </div >
        </>
    )

}

export default Input
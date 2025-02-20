import { useState } from "react";

// Array di articoli
const listArticles = [
    {
        id: 1,
        titolo: "La bellezza della natura",
        autore: "Giulia Bianchi",
        contenuto: "La natura è un dono prezioso, che ci offre paesaggi mozzafiato e momenti di serenità.",
        categoria: "Natura",
        disponibile: true
    },
    {
        id: 2,
        titolo: "L'importanza della lettura",
        autore: "Marco Rossi",
        contenuto: "La lettura è uno degli strumenti più potenti per crescere e conoscere il mondo.",
        categoria: "Cultura",
        disponibile: true
    },
    {
        id: 3,
        titolo: "Tecnologie del futuro",
        autore: "Luca Verdi",
        contenuto: "L'intelligenza artificiale e la robotica stanno cambiando il nostro modo di vivere.",
        categoria: "Tecnologia",
        disponibile: true
    },
    {
        id: 4,
        titolo: "Viaggiare in Italia",
        autore: "Sara Neri",
        contenuto: "L'Italia offre una varietà incredibile di destinazioni turistiche per tutti i gusti.",
        categoria: "Viaggi",
        disponibile: false
    },
    {
        id: 5,
        titolo: "La cucina mediterranea",
        autore: "Antonio Esposito",
        contenuto: "La cucina mediterranea è famosa per la sua freschezza e i suoi sapori unici.",
        categoria: "Cucina",
        disponibile: true
    }
];

// Variabile iniziale dell'articolo
const articleData = {
    titolo: "",
    autore: "",
    contenuto: "",
    categoria: "",
    disponibile: false
}


export default function input() {

    // Stato dell'articolo
    const [articles, setListArticles] = useState(listArticles);
    // Inserimento nuovo articolo
    const [newArticle, setNewArticle] = useState(articleData);

    //Funzione per gestire il form
    function handleData(e) {
        // Gestione del checkbox
        const value =
            e.target.type === "checkbox" ?
                e.target.checked : e.target.value;

        setNewArticle((newArticle) => ({
            ...newArticle,
            [e.target.title]: value,
        }))

        // setNewArticle('');
    }

    // Funzione per aggiungere gli articoli 
    // Con id giusto
    function handleSubmit(e) {
        e.preventDefault();
        setListArticles((articles) => [...articles,
        {
            id: articles.length === 0 ? 1 : articles[articles.length - 1].id + 1,
            ...newArticle
        }]);
        // resetto il form
        setNewArticle(articleData);
    }

    // Cancello articolo
    function deleteArticle(idArticle) {
        const updatedArticle = articles.filter((article) => {
            return article.id !== idArticle
        });
        setListArticles(updatedArticle);
    }

    // Articoli
    return (
        <>
            <div id="content">

                <div id="input-box">


                    <form onSubmit={handleSubmit}>
                        <h1>INSERISCI IL TUO ARTICOLO</h1>
                        <input
                            type="text"
                            title="titolo"
                            value={newArticle.titolo}
                            onChange={handleData}
                            placeholder="Titolo"
                            required
                        />

                        <input
                            type="text"
                            title="autore"
                            value={newArticle.autore}
                            onChange={handleData}
                            placeholder="Autore"
                            required
                        />

                        <input
                            type="text"
                            title="categoria"
                            value={newArticle.categoria}
                            onChange={handleData}
                            placeholder="Categoria"
                            required
                        />


                        <label htmlFor="disponibile">Disponibile</label>
                        <input
                            type="checkbox"
                            title="disponibile"
                            checked={newArticle.disponibile}
                            onChange={handleData}
                            id="disponibile"
                            required
                        />

                        <textarea
                            type="text"
                            title="contenuto"
                            value={newArticle.contenuto}
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

                {articles.length === 0 ?
                    <h2>Non ci sono articoli</h2>
                    :
                    <div id="content-art">
                        {articles.map((article) => (

                            <div className="post" key={article.id}>

                                <h3>{article.titolo}</h3>
                                <h4>{article.autore}</h4>
                                <p id="contenuto">{article.contenuto}</p>
                                <span id="categoria">{article.categoria}</span>
                                <p id="disponibile">{article.disponibile ? "Disponibile" : "Non disponibile!"}</p>


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
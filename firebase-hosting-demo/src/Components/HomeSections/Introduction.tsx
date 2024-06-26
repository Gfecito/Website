import React from "react";

interface Props {
    one_liners: string[],
    expansions: string[],
    books: string[],
}

class Introduction extends React.PureComponent<Props>{

    // Remove the data-aos if not using AOS on App root.
    render() {
        const { one_liners, expansions, books } = this.props;
        var traits: JSX.Element[] = [];
        var shelves: JSX.Element[] = [];

        // Short bio
        for (let i = 0; i < one_liners.length; i++) {
            traits.push(
                <p className="text_expanded" key={"text-section-" + i}>
                    <span className="expand_text">{one_liners[i]}</span> {expansions[i]}
                </p>
            );
        };

        // Library
        for (let i = 0; i < books.length / 5; i++) {
            let shelf: JSX.Element[] = [];
            for (let j = 0; j < 5; j++) {
                // Add books to shelf
                if ((i * 5 + j) < books.length) shelf.push(
                    <div className="book" key={"book-" + (i * 5 + j)} style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/" + books[i * 5 + j] + ")" }}></div>
                );
            }
            // Add shelf to shelves
            shelves.push(
                <div className="bookShelf" key={"shelf-" + i}>
                    <div className="bookRow" style={{
                        gridTemplateColumns: "repeat(" + shelf.length + ", min(20%, 180px)",
                        paddingLeft: (5 - shelf.length) * 10 + "%" // 5 is max; 10 = 20/2. Add as padding half of extra space
                    }}>
                        {shelf}
                    </div>
                    <div className="shelf"></div>
                </div>
            );
        };


        return (
            <section id="me">
                <h1 style={{color:"orangered"}}>$ cat personality.txt ⏎</h1>
                <div id="intro-content">
                    {traits}
                    <span className="expand_text" style={{ color: "var(--light-blue)" }}>
                        Seemingly you can tell a lot about a person based on what they like to read. Well, here I am!
                    </span>
                    <div id="library">
                        <div className="bookShelfs">
                            {shelves}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Introduction;
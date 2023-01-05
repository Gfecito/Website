import React from "react";

interface Props {
    big_title: string,
    titles: string[],
    descriptions: string[][],
    illustrations: string[],
    prefix: string
}


// Put arrow on selected tab =)
class Tabs extends React.PureComponent<Props>{
    rendered_page_index = 0;

    openProject = (id: number) => {
        this.rendered_page_index = id;
        this.forceUpdate();
    }

    addLinks(paragraph: String): JSX.Element{
        const splitted = paragraph.split("<l");
        return <>{splitted[0]} <a href={splitted[1]} target="_blank"> {splitted[1]} </a></>
    }

    render() {
        const { big_title, titles, descriptions, illustrations, prefix } = this.props;
        const openProject = this.openProject.bind(this);
        let tabs: JSX.Element[] = [];
        let pages: JSX.Element[] = [];
        let rendered_page;

        // Dispatch abbreviation logic.
        const filter = (word: string) => { return (((word.charAt(0)) >= '0' && (word.charAt(0)) <= '9') || (word.length <= 5)); };
        const initialCapitalizer = (word: string) => { return (word.charAt(0).toUpperCase()) };
        const adaptPhraseAndJoin = (phrase: string, filter: (any) => boolean, newWord: (string) => string) => {
            return (phrase.split(" ").map(word =>
                (filter(word) ? word + " " : newWord(word))).join(""));
        };
        const firstThree = (word: string) => { return (initialCapitalizer(word) + word.substring(1, 2)) };

        // Make buttons with abbreviations
        for (let i = 0; i < titles.length; i++) {
            let words = titles[i].split(" ");
            let abbreviation = "";


            if (words.length === 1) abbreviation = words[0].substring(0, 14)
            if (words.length === 2) abbreviation = adaptPhraseAndJoin(titles[i], filter, firstThree)
            if (words.length > 2) abbreviation = adaptPhraseAndJoin(titles[i], filter, initialCapitalizer)
            tabs.push(
                <button className={prefix + "Tabs"} key={"tab-button-" + prefix + "-" + i} onClick={() => { openProject(i) }}>
                    {abbreviation}
                </button>
            );
        }


        for (let i = 0; i < titles.length; i++) {
            const key = prefix + titles + i;
            pages.push(
                <div id={key} key={key} className="tabContent">
                    <div className="tabDescriptor">
                        <h3>{titles[i]}</h3>
                        {descriptions[i].map(paragraph => <p key={"tab-descriptor-" + i + paragraph.substring(0, 3)}>{this.addLinks(paragraph)}</p>)}
                    </div>
                    <div className="tabDisplay">
                        <img src={process.env.PUBLIC_URL + "/" + illustrations[i]} alt="Tab Content" />
                    </div>
                </div>
            );
        }

        rendered_page = pages[this.rendered_page_index];

        return (
            <section id={prefix}>
                <h1>{big_title}</h1>
                <div id={prefix + "Window"} className="tabs_and_content">
                    <div id={prefix + "Tabs"} className="tabs" style={{ gridTemplateRows: "repeat(" + titles.length + ",minmax(min-content,max-content))" }}>
                        {tabs}
                    </div>
                    <div id={prefix + "Content"} className="content">
                        {rendered_page}
                    </div>
                </div>
            </section>
        );
    }
}


export default Tabs
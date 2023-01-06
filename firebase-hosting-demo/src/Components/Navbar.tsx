import React from 'react';


export interface Props {
    icon: string,
    sections: string[],
    languages: string[]
}

class Navbar extends React.PureComponent<Props>{

    render() {
        const { icon, sections } = this.props;
        var nav_elements = [];

        sections.forEach(section => {
            nav_elements.push(
                <a href={"#" + section}>{section[0].toUpperCase() + section.substring(1)}</a>
            );
        });

        return (
            <nav id="nav">
                <img src={process.env.PUBLIC_URL + "/" + icon} />
                {nav_elements}
            </nav>
        )
    }
}

export default Navbar;
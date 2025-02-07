import footerStyle from "../styles/footer.module.css"
function FooterSection() {
    return (
        <>
            <footer className={footerStyle.foot}>
            <p>@{new Date().getFullYear()} Copyrights Ecommer-list-page.
            <a href="https://github.com/SVigramR/" target="_blank" className={footerStyle.githubLink}> SVigramR</a>
            </p> 
            </footer>
        </>
    )
}

export default FooterSection;
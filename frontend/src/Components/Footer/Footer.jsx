const Footer = () => {
    return ( 
        <footer style={styles}>
            <p  style={style2}>this website was designed, coded and developed by<a style={style1} href="https://test-shadialhamdos-projects.vercel.app/">Shadi-Alhamdo</a> </p>
         <p> © {new Date().getFullYear()} Sketch-Blog All rights reserved.</p>
        </footer>
     );
}

const styles={
    color:"var(--white-color)",
    backgroundColor:"var(--bd-violet)",
    fontSize:"18px",
    display:"flex",
    flexDirection: "column",
    justifyContent:"center",
    alignItems:"center",
    minHeight:"50px",
    with:"100%",
}
const style1={
    color:"var(--white-color)",
    marginLeft:"10px",
    textDicoration:"none"
}
const style2={
    color:"var(--gray-color)",
    marginLeft:"10px",
    textDicoration:"none",
    fontSize:"14px"
}
 
export default Footer;
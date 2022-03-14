import Header from '../layout/Header';
import Footer from '../layout/Footer';


const LayoutTwo = (props:any) => {
    return (
    <div className={props.className}>
        sidebar
        {props.children}
        footer
    </div>
  );
};

export default LayoutTwo;

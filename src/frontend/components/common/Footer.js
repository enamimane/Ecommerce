import React from 'react';



const Footer = () => {

   /* const [subValue, setSubValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubValue('');
        alert('Thankyou, you are subscribed to receive our daily newsletter');
    };
*/
    const currYear = new Date().getFullYear();


    return (
        <footer id="footer">
            

            

            <div className="sub_footer">
                <div className="container">
                   
                        <div className="foot_copyright">
                           <p>
                                {currYear} | Fashi. All Rights Reserved.
                            </p>
                        </div>
                        
                    </div>
                </div>
            
        </footer >
    );
};

export default Footer;
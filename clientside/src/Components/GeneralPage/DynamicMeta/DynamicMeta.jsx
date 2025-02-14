import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const DynamicMeta = ({ title, description, image }) => {
    const location = useLocation();
    const url = `${window.location.origin}${location.pathname}`;
    console.log({ title, description, image });
    
    return (
        <Helmet>
            <title>{title || "MedxBay"}</title>
            <meta name="description" content={description} />

            {/* Open Graph (OG) Meta Tags for Facebook, WhatsApp */}
            <meta property="og:title" content={title || "MedxBay"} />
            <meta property="og:description" content={description || "MedxBay is an AI-enabled healthcare platform that revolutionizes provider workflows and patient care."} />
            <meta property="og:image" content={image || "preview.jpeg"} />
            <meta property="og:url" content={url || "https://medxbay.com"} />
            <meta property="og:type" content="website" />

            {/* Twitter Meta Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Helmet>
    );
};

export default DynamicMeta;

import { Box, Card, Typography } from "@mui/material"
import Image from "next/image";

import styles from "../../styles/brands.module.css"

const Brand = ({images}) => {
    const imageLoader = ({ src }) => {
        return `http://localhost:1337${src}`;
    };

    return (
        <Box className={styles.container}>
            <Typography variant="h4" align="center" sx={{ color: "black", letterSpacing: 8.5}}> All Brands </Typography>
            <Box className={styles.brandImage}>
                {images && images.map((image) => (
                        <Card className={styles.card} key={image.url}>
                            <Image
                                src={image.url}
                                width={350}
                                height={350}
                                alt={"image.alt"}
                                loader={imageLoader}
                            />
                        </Card>
                    ))}
            </Box>
        </Box>
    )
}

export default Brand

export async function getServerSideProps() {
    const res = await fetch("http://localhost:1337/api/brands?populate[brandImage][populate]=*");
    const images = await res.json();

    return {
      props: {
        images: images?.data.map((item) => {
            const {attributes} = item?.attributes?.brandImage?.data

            return attributes
        }),
      },
    };
}


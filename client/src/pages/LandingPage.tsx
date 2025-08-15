import { Box, SimpleGrid } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Product } from "../models/Product";

export const LandingPage = () => {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('api/products').then(async res => {
            setProducts(await res.json());
        })
    }, []);

    return <SimpleGrid columns={2} gap="40px" style={{ margin: 25 }}>
        {products.map(product => 
            <Box style={{
                padding: 10,
                border: '2px solid #000'
            }}>
                <b>{product.title}</b>
                <p>{product.descriptionText}</p>
            </Box>
        )}
    </SimpleGrid>
}
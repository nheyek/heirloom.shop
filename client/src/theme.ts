import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineRecipe,
  defineTokens,
} from "@chakra-ui/react"

export const buttonRecipe = defineRecipe({
  variants: {
    variant: {
      outline: {
        base: {
          borderColor: "#FFFFFF",
          color: "#FFFFFF",
          _hover: { color: "#FFFFFF" },
        },
      },
    }
  },
});


const config = defineConfig({
  theme: {
    semanticTokens: {
      colors: {
        brand: { value: "#121212" },
      },
    },
    recipes: {
      Button: buttonRecipe
    }
  },
})


export default createSystem(defaultConfig, config);
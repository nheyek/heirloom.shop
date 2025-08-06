import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineTokens,
} from "@chakra-ui/react"

const config = defineConfig({
  theme: {
    semanticTokens: {
      colors: {
        brand: { value: "#550000" },
      },
    },
  },
})


export default createSystem(defaultConfig, config);
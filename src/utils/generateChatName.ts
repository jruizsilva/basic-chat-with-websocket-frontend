export const generateChatName = (text1: string, text2: string) => {
  // Función de comparación para ordenar los textos
  const compareFunction = (a: string, b: string) => a.localeCompare(b)

  // Ordenar los textos usando la función de comparación
  const sortedTexts = [text1, text2].sort(compareFunction)

  // Concatenar los textos ordenados
  return `${sortedTexts[0]}_${sortedTexts[1]}`
}

export const generateChatName = (text1: string, text2: string) => {
  // Función de comparación para ordenar los textos
  const compareFunction = (a: string, b: string) => a.localeCompare(b)

  // Eliminar todos los espacios de los textos y ordenarlos
  const sortedTexts = [text1.replace(/\s/g, ''), text2.replace(/\s/g, '')].sort(
    compareFunction
  )

  // Concatenar los textos ordenados
  return `${sortedTexts[0]}_${sortedTexts[1]}`
}

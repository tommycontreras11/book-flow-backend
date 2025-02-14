import { BookEntity } from "./../database/entities/entity/book.entity"

export const getExtensionByFileName = (fileName: string) =>
	fileName.match(/\.([^.]+)$/)?.[1]

export const generateUniqueFileName = async (extension: string): Promise<string> => {
	const fileName = `${new Date().getTime()}.${extension}`
	const exists = await BookEntity.findOne({
		where: {
			file_name: fileName
		}
	}).catch((error) => {
		console.error('BookEntity.findOne', { error })
		return undefined
	})

	if (exists === undefined)
		return Promise.reject({ message: 'Something went wrong' })

	if (exists) return generateUniqueFileName(extension)

	return Promise.resolve(fileName)
}
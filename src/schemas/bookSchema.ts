import * as yup from 'yup';

export const userSchema = yup.object({
  name: yup.string().required('Name is required').min(3, 'Name must be at least 3 characters').max(250, 'Name must be at most 250 characters'),
  topographicalSignature: yup.string().required('Topographical signature is required'),
  isbn: yup.string().required('Isbn is required'),
  publicationYear: yup.number().required('Publication year is required'),
  bibliographyTypeUUID: yup.number().required('Publication year is required'),
  publisherUUID: yup.string().uuid({ message: 'Publisher UUID is not valid' }).required('Publication year is required'),
  languageUUID: yup.string().uuid({ message: 'Language UUID is not valid' }).required('Publication year is required'),
  scienceUUID: yup.string().uuid({ message: 'Science UUID is not valid' }).required('Publication year is required'),
  authorUUIDs: yup.array().of(yup.string().uuid({ message: 'Author UUID is not valid' })).required('At least one author is required'),
});
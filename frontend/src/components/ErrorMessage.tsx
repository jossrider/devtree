export default function ErrorMessage({ children }: { children: React.ReactNode }) {
  return <p className='bg-red-50 text-red-600 uppercase text-sm font-bold text-center p-1.5'>{children}</p>
}

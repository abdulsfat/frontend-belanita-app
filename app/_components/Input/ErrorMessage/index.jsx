export default function ErrorMessage({ message }) {
    if (!message) return null;
    return <p className="text-red-500 mt-0 text-sm">{message}</p>;
}
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center p-4">
            <div className="bg-container-primary flex h-75 flex-col items-center justify-center gap-2 rounded-md p-4 text-center">
                <h1>Page Not Found</h1>
                <p>Sorry! This page does not exist.</p>
                <Link className="btn btn-primary" href="/">
                    Go Home
                </Link>
            </div>
        </div>
    );
}

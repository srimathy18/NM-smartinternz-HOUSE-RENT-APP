import AdminFormReview from "@/components/RForm";
import { useEffect, useState } from "react";

export default function ReviewForm(){

    const [forms, setForms] = useState([]);
    useEffect(()=> {
        const fetchReviewForms = async () => {
            const res = await fetch('/api/listing/get?status=created');
            const data = await res.json();
            setForms(data);
        }

        fetchReviewForms()
    }, [])

    useEffect(() => {
        console.log(forms);

    }, [forms])
    return (
        <AdminFormReview forms={forms}/>
    )
}
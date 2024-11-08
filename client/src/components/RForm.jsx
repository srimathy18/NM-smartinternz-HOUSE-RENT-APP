import { useEffect, useState } from 'react'
import { ChevronDown, ChevronUp, Check, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"

// Mock data for rental applications
const mockApplications = [
  {
    id: 1,
    title: "Rental Application - John Doe",
    status: "Pending",
    fields: [
      { name: "Applicant Name", value: "John Doe" },
      { name: "Email", value: "john@example.com" },
      { name: "Phone Number", value: "123-456-7890" },
      { name: "Property Address", value: "123 Main St, Cityville" },
      { name: "Monthly Rent", value: "$1200" },
      { name: "Move-in Date", value: "2023-11-01" },
      { name: "Additional Notes", value: "Looking for a 1-year lease." }
    ]
  },
  {
    id: 2,
    title: "Rental Application - Jane Smith",
    status: "Pending",
    fields: [
      { name: "Applicant Name", value: "Jane Smith" },
      { name: "Email", value: "jane@example.com" },
      { name: "Phone Number", value: "987-654-3210" },
      { name: "Property Address", value: "456 Elm St, Townsville" },
      { name: "Monthly Rent", value: "$1500" },
      { name: "Move-in Date", value: "2023-12-15" },
      { name: "Additional Notes", value: "Prefers a pet-friendly unit." }
    ]
  },
  // Add more mock applications as needed
]

const fields = ["description", "address", "regularPrice", "discountPrice", "parking"]

export default function AdminRentalReview({forms}) {
  const [applications, setApplications] = useState(forms)
  const [expandedApplication, setExpandedApplication] = useState(null);

  useEffect(() => {
    setApplications(forms);
  }, [forms])

  const handleExpand = (applicationId) => {
    setExpandedApplication(expandedApplication === applicationId ? null : applicationId)
  }

  console.log(applications)

  const handleAccept = async(applicationId) => {
    try {
      const res = await fetch("/api/listing/approvelist?id="+applicationId)
      console.log(await res.json());
      window.location.href = "/review";
    } catch (error) {
      console.log(error)
    }
  }

  const handleReject = (applicationId) => {
    setApplications(applications.map(application => 
      application.id === applicationId ? { ...application, status: "Rejected" } : application
    ))
  }

  return (
    <div className="container max-w-screen-sm mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Rental Applications to Review</h1>
      <div className="space-y-4">
        {applications.map(application => (
          <Card key={application._id} className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {application.name}
              </CardTitle>
              <Badge 
                variant={application.status === "created" ? "outline" : application.status === "accepted" ? "success" : "destructive"}
              >
                {application.status}
              </Badge>
            </CardHeader>
            <CardContent>
              <Button 
                variant="ghost" 
                className="w-full justify-between" 
                onClick={() => handleExpand(application.id)}
              >
                {expandedApplication === application.id ? "Hide Details" : "Show Details"}
                {expandedApplication === application.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
              {expandedApplication === application.id && (
                <div className="mt-2 space-y-2">
                  {fields.map((field, index) => (
                    <div key={index} className="grid grid-cols-2 gap-2">
                      <span className="font-medium">{field.slice(0,1).toUpperCase() + field.slice(1)}:</span>
                      <span>{application[field]}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter className="justify-end space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleReject(application.id)}
                disabled={application.status !== "created"}
              >
                <X className="h-4 w-4 mr-2" />
                Reject
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                onClick={() => handleAccept(application._id)}
                disabled={application.status !== "created"}v
              >
                <Check className="h-4 w-4 mr-2" />
                Accept
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

import { useEffect, useState } from "react";
import { useAuth } from "../hooks/AuthProvider";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Bell,
  CircleUser,
  Home,
  Menu,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import PdfViewer from "./PdfViewer";
import PdfList from "./PdfList";
// import SnackBar from "./SnackBar";
import { toast } from "sonner";
const Dashboard = () => {
  const auth = useAuth();
  const [pdfFile, setPDFFile] = useState(null);
  const [selectedFileId, setSelectedFileId] = useState(null);
  const user = auth.getCurrentUserEmail();
  const [upload, setUpload] = useState(false);
  // const [toggle, setToggle] = useState(false);

  // const handleShowSnack = () => {
  //   setToggle(true);
  //   setTimeout(() => {
  //     setToggle(false);
  //   }, 3000);
  // };
  const handleFileChange = (e) => {
    setPDFFile(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    setUpload(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("pdf", pdfFile);
    formData.append("email", user);
    try {
      const response = await axios.post(
        "https://pdf-share.onrender.com/api/pdf/upload-pdf",
        formData
      );
      console.log(response);
      toast.success("Pdf Uploaded successfully");
    } catch (error) {
      console.error("PDF upload error:", error);
    }

    setUpload(false);
    window.location.reload();
  };
  useEffect(() => {
    console.log(selectedFileId);
  }, [selectedFileId]);
  return (
    // <div className="container">
    //   <div>
    //     <h1>Welcome! {auth.user?.username}</h1>
    //     <button onClick={() => auth.logOut()} className="btn-submit">
    //       logout
    //     </button>
    //   </div>
    // </div>
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block max-h-screen">
        <div className="flex h-full max-h-screen flex-col gap-2 ">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">DocuFlow</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              {/* <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Users className="h-4 w-4" />
                Shared Documents
              </Link> */}
              <a
                href="/create"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Users className="h-4 w-4" />
                Create Workflow
              </a>
              {/* <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <LineChart className="h-4 w-4" />
                Analytics
              </Link> */}
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <a href="/#pricing">
                  <Button size="sm" className="w-full">
                    Upgrade
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                {/* <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Shared Documents
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    6
                  </Badge>
                </Link> */}
                <a
                  href="/create"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Create Workflow
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    6
                  </Badge>
                </a>
                {/* <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Package className="h-5 w-5" />
                  Analytics
                </Link> */}
              </nav>
              <div className="mt-auto">
                <Card>
                  {/* <CardHeader>
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription>
                      Unlock all features and get unlimited access to our
                      support team.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="w-full">
                      Upgrade
                    </Button>
                  </CardContent> */}
                </Card>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search docs..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => auth.logOut()}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1  gap-4 p-4 lg:gap-6 lg:p-6  border border-right flex-col md:flex-row ">
          <div className="md:w-[40vw] w-[80vw]">
            <PdfList setSelectedFileId={setSelectedFileId} />
            <div className="flex items-center">
              <h1 className="text-lg font-semibold md:text-2xl">
                PDF Upload and Share
              </h1>
            </div>
            <div className="flex flex-1 flex-col gap-4">
              {/* Render uploaded file section */}
              <div className="flex items-center justify-center rounded-lg border border-dashed shadow-sm">
                <div className="flex flex-col items-center gap-1 text-center">
                  <p className="text-sm text-muted-foreground my-2">
                    Upload a PDF to collaborate with others.
                  </p>
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    encType="multipart/form-data"
                  >
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="border rounded p-2 my-4"
                      name="pdf"
                    />
                    <button
                      type="submit"
                      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-gray-600 mx-4 mb-2"
                    >
                      {upload ? "Uploading" : "Upload"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
            {/* Render selected file section */}
          </div>
          <div className="border border-dashed max-w-[90vw]">
            {selectedFileId ? (
              <div className=" rounded-lg border border-dashed shadow-sm p-2 pb-0 ">
                <PdfViewer fileId={selectedFileId} user={user} />
              </div>
            ) : (
              <h2 className="w-full">Select file to view </h2>
            )}
          </div>
          {/* <Button onClick={handleShowSnack}>Show Snack Bar</Button>
          {
            toggle&&<SnackBar/>
          } */}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

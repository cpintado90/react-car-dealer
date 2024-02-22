import { Card, CardHeader, CardBody,Typography, Button,
    IconButton, Tabs, TabsHeader, Tab,TabsBody, TabPanel,
  } from "@material-tailwind/react";
import { useRef, useState } from "react";
import vehicleJson from './Vehicle-Highlights.json';
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { NumericFormat } from "react-number-format";

export default function VehicleHighlight() {
    const [carCategories] = useState(vehicleJson);
    const [currentCategory, setCurrentCategory] = useState(carCategories.vehicleCategories.find((category) => category.value === "Crossovers & SUV's"));
    const [currentPosts, setCurrentPosts] = useState(currentCategory.vehicles.slice(0,2));
    const [activeTab, setActiveTab] = useState("Crossovers & SUV's");
    const [currentPage, setCurrentPage] = useState(1);
    let postsPerPage = useRef(2);
    const [pagesList, setPagesList] = useState(calculatePagination(currentCategory));

    const setCurrentTab = (selectedTab) => {
        const pageReset = 1;
        setCurrentPage(pageReset);
        setActiveTab(selectedTab);

        let selectedCategory = getCurrentCategory(selectedTab)
        setCurrentCategory(selectedCategory);
        calculateCurrentPage(pageReset, selectedTab);

        let pageTotal = calculatePagination(selectedCategory);
        setPagesList(pageTotal);
    }

    function calculateCurrentPage(newPage, selectedTab){
        setCurrentPage(newPage);
        let category = getCurrentCategory(selectedTab);
        let lastPostIndex = newPage * postsPerPage.current;
        let firstPostIndex = lastPostIndex - postsPerPage.current;
        const postResult = category.vehicles.slice(firstPostIndex,lastPostIndex)
        setCurrentPosts(postResult);
        return;
    }

    function getCurrentCategory(selectedTab){
        return carCategories.vehicleCategories.find((category) => category.value === selectedTab)
    }

    function calculatePagination(category){
        let tableLength = category.vehicles.length;
        let pageResult = [];

        for(let i = 1; i <= Math.ceil(tableLength/postsPerPage.current); i++){
            pageResult.push(i);            
        }

        return pageResult;
    }
    
    const getItemProps = (index) =>
    ({
      id: index,
      key: index,
      variant: currentPage === index ? "filled" : "text",
      color: "gray",
      onClick: () => calculateCurrentPage(index, activeTab),
    });

    const next = () => {
        if (currentPage === pagesList.length) return;
     
        const newPage = currentPage + 1;
        calculateCurrentPage(newPage, activeTab);
    };
     
    const prev = () => {
        if (currentPage === 1) return;
        
        const newPage = currentPage - 1;
        calculateCurrentPage(newPage, activeTab);
    };

    return (
        <div>
            <div className="pt-6">
                <Typography variant="h2">
                    Explore All Vehicles
                </Typography>
            </div>
            
            <div>
                <Tabs value={activeTab}>
                    <TabsHeader
                        className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                        indicatorProps={{
                        className:
                            "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                        }}>

                        {carCategories.vehicleCategories.map(({ label, value }) => (
                        <Tab
                            key={value}
                            value={value}
                            onClick={() => setCurrentTab(value)}
                            className={activeTab === value ? "text-gray-900" : ""}>
                            {label}
                        </Tab>
                        ))}
                    </TabsHeader>
                    <TabsBody>
                        <div >
                        {carCategories.vehicleCategories.map(({value}) => (                        
                        <TabPanel key={value} value={value} className="grid grid-cols-2 ml-20">                            
                            {
                                  currentPosts.map((car) =>{
                                    return (                        
                                        <Card className="w-full max-w-[48rem] flex-row" key={car.id}>
                                        <CardHeader
                                            shadow={false}
                                            floated={false}
                                            className="m-0 w-2/5 shrink-0 rounded-r-none">
                                            <img
                                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                                            alt="card"
                                            className="h-full w-full object-cover"
                                            />
                                        </CardHeader>
                                        <CardBody>                            
                                            <Typography variant="h6" color="gray" className="mb-3 uppercase">{car.year} | {car.title}</Typography>
                                            <Typography variant="h4" color="blue-gray" className="mb-2">{car.model}</Typography>
                                            <Typography color="gray" className="mb-8 font-normal">{car.description}</Typography>                
                                            <Typography color="gray" className="mb-2 font-normal float-left">
                                            <NumericFormat value={car.costAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                            </Typography>
                
                                            <Typography color="gray" className="mb-2 font-normal float-right">{car.mpg}</Typography>
                                            
                                            <a href="http://www.google.com" className="inline-block pt-6">
                                            <Button variant="text" className="flex items-center gap-2 pt-6">
                                                Learn More
                                                <svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24"
                                                stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"/>
                                                </svg>
                                            </Button>
                                            </a>
                                        </CardBody>
                                    </Card>
                                   )
                                })
                            }
                            
                        </TabPanel>
                        ))}
                        </div>
                    </TabsBody>
                </Tabs>
            </div>
            <div>
                <div className="flex items-center gap-4 pt-6 justify-center">
                    <Button
                        variant="text"
                        className="flex items-center gap-2"
                        onClick={prev}
                        disabled={currentPage === 1}>
                        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
                    </Button>
                    <div className="flex items-center gap-2">
                        { pagesList.map((page) =>{
                            return(<IconButton {...getItemProps(page)}>{page}</IconButton>)
                            })
                        }
                    </div>
                    <Button
                        variant="text"
                        className="flex items-center gap-2"
                        onClick={next}
                        disabled={currentPage === pagesList.length}>
                        Next
                        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                    </Button>
                </div>   
            </div>      
            <div className="flex items-center gap-4 pt-6 justify-center">
                    <div>
                        <Button><Typography color="white" className="mb-2 font-normal float-right">Explore All Vehicles</Typography></Button>                                        
                    </div>
                    <div>
                        <Button><Typography color="white" className="mb-2 font-normal float-right">Search Inventory</Typography></Button>                                        
                    </div>
            </div>   
            <div className="pt-20"></div>   
        </div>
    )
}
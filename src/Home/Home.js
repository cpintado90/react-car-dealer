import { Button, ButtonGroup, Typography } from "@material-tailwind/react";
import CarCarousel from "./Carousel/CarCarousel";
import VehicleHighlight from "./vehicle-highlights/Vehicle-Highlights";
import { BanknotesIcon, MagnifyingGlassIcon, MapPinIcon, WrenchIcon } from "@heroicons/react/24/outline";


export default function Home(){
    return (
        <div>
            <CarCarousel />
            <VehicleHighlight />
            <div className="bg-gray-200 pt-6">
                <div className="pt-10">
                    <Typography variant="h6" color="gray" className="mb-3 uppercase">Hold on Tight</Typography>
                </div>
                <div>
                    <Typography variant="h3" color="blue-gray" className="mb-2">The all-new Tacoma is built for fun.</Typography>
                </div>
                <div className="pt-10">
                    <Button>
                       Learn More
                    </Button>
                </div>
                <div className="flex items-center gap-4 pt-8 justify-center">                    
                    <video className="rounded-lg size-3/5" controls>
                    <source src="https://docs.material-tailwind.com/demo.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className="pt-12"></div>                
            </div>
            <div className="flex flex-col items-center justify-center pt-6">
                    <div>
                        <Typography variant="h1" color="blue-gray" className="mb-2">Shopping Tools</Typography>
                    </div>
                    <div className="divide-x justify-center pt-10">
                        <ButtonGroup variant="text" >
                        <Button>
                                <WrenchIcon className="h-24 w-24"/>
                                <Typography variant="h6" color="blue-gray" className="mb-2">Build & Price</Typography>
                        </Button>
                        <Button>
                                <MagnifyingGlassIcon className="h-24 w-24"/>
                                <Typography variant="h6" color="blue-gray" className="mb-2">Search Inventory</Typography>                                
                        </Button>
                        <Button>
                                <BanknotesIcon className="h-24 w-24"/>
                                <Typography variant="h6" color="blue-gray" className="mb-2">Local Specials</Typography>                                
                        </Button>
                        <Button>
                                <MapPinIcon className="h-24 w-24"/>   
                                <Typography variant="h6" color="blue-gray">Find a Dealer</Typography>                                                     
                        </Button>
                        </ButtonGroup>
                    </div>
            </div>

        </div>
    );
}
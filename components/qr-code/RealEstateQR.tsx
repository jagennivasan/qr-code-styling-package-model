"use client";

import React, { useEffect, useRef, useState, ChangeEvent } from "react";

import LogoOptions from "../customization/LogoOptions";
import { Input } from "../ui/input";
import QRCodeStyling, {
  Options,
  FileExtension,
  CornerSquareType,
  CornerDotType,
  DotType,
} from "qr-code-styling";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";

export default function RealEstate() {
  const [realEstate, setRealEstate] = useState({
    propertyName: "",
    propertyType: "House",
    price: "",
    size: "",
    bedrooms: "",
    bathrooms: "",
    furnishingStatus: "Fully Furnished",
    features: "",
    amenities: "",

    agentOwnerName: "",
    contactNumber: "",
    emailId: "",

    location: "",
    customMessage: "",
  });

  const [logo, setLogo] = useState<string | null>(null);
  const [fileExt, setFileExt] = useState<FileExtension>("svg");
  const [qrCode, setQrCode] = useState<QRCodeStyling>();
  const ref = useRef<HTMLDivElement>(null);

  const [options, setOptions] = useState<Options>({
    width: 250,
    height: 250,
    type: "svg",
    data:"",
    image: logo as string,
    margin: 8,
    qrOptions: {
      typeNumber: 0,
      mode: "Byte",
      errorCorrectionLevel: "Q",
    },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.4,
      margin: 2,
      crossOrigin: "anonymous",
      saveAsBlob: true,
    },
    dotsOptions: {
      type: "classy-rounded" as DotType,
      color: "#222222",
    },
    cornersSquareOptions: {
      type: "extra-rounded" as CornerSquareType,
      color: "#222222",
    },
    cornersDotOptions: {
      type: "dot" as CornerDotType,
      color: "#222222",
    },
    backgroundOptions: {
      color: "#5FD4F3",
    },
  });

  useEffect(() => {
    setQrCode(new QRCodeStyling(options));
  }, []);

  useEffect(() => {
    if (ref.current) {
      qrCode?.append(ref.current);
    }
  }, [qrCode, ref]);
  


  useEffect(() => {
    if (
      realEstate.propertyName &&
      realEstate.propertyType &&
      realEstate.price &&
      realEstate.size &&
      realEstate.bathrooms &&
      realEstate.bedrooms &&
      realEstate.furnishingStatus &&
      realEstate.features &&
      realEstate.amenities &&
      realEstate.agentOwnerName &&
      realEstate.contactNumber &&
      realEstate.emailId &&
      realEstate.location &&
      realEstate.customMessage
    ) {
      const RealEstdata = `
      ${realEstate.propertyName}
      Property type:
       ${realEstate.propertyType}
      price:
        ${realEstate.price}
      size:
        ${realEstate.size}
      bathrooms:
        ${realEstate.bathrooms}
      bedrooms:
        ${realEstate.bedrooms}
      furnishing status:
        ${realEstate.furnishingStatus}
      fetures: 
        ${realEstate.features}
      amenities:
        ${realEstate.amenities}
      agent/owner name:
        ${realEstate.agentOwnerName}
      contact number:
        ${realEstate.contactNumber}
      email Id:
        ${realEstate.emailId}
      location:
        ${realEstate.location}
      custom message:
        ${realEstate.customMessage}

      `;
      setOptions((prevOptions) => ({
        ...prevOptions,
        data: RealEstdata,
      }));
    }
  }, [realEstate]);

  useEffect(() => {
    if (!qrCode) return;
    qrCode?.update(options);
  }, [qrCode, options]);


  const handleOptionChange = <K extends keyof Options>(
    key: K,
    value: Options[K]
  ) => {
    setOptions((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    if (logo) {
      setOptions((prevOptions) => ({
        ...prevOptions,
        image: logo, // Update the logo
      }));
    }
  }, [logo]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      console.error("No file selected");
    }
  };

  const onDownloadClick = () => {
    if (!qrCode) return;
    qrCode.download({ extension: fileExt });
  };

  const onLogoSelect = (select: string) => {
    setLogo(select);
    setOptions((prevOptions) => ({
      ...prevOptions,
      image: select,
      imageOptions: {
        ...prevOptions.imageOptions,
        imageSize: 0.3,
        margin: 2,
      },
    }));
  };
  const onExtensionChange = (value: string) => {
    setFileExt(value as FileExtension);
  };

  const handelFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRealEstate((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleEstateChange = (value: string) => {
    setRealEstate((prevForm) => ({
      ...prevForm,
      propertyType: value,
    }));
  };

  const handlefurnitureChange = (value: string) => {
    setRealEstate((prevForm) => ({
      ...prevForm,
      furnishingStatus: value,
    }));
  };

  const onDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setOptions(options => ({
      ...options,
      [name]:value
    }));
  };
  return (
    <div className="flex flex-col md:flex-row md:justify-between w-full space-y-5 md:space-y-0 md:space-x-5 items-center">
      <div className="w-full md:w-2/3 lg:w-3/4 max-w-3xl px-4">
        <h1 className="text-2xl mb-2">RealEstate QR Code</h1>
        <div className="space-y-3 mb-2">
          <div>
            <Label htmlFor="propertyNameInput">Property Name</Label>
            <Input
              id="propertyNameInput"
              type="text"
              name="propertyName"
              placeholder="Name of the property"
              value={realEstate.propertyName}
              onChange={handelFormChange}
            />
          </div>

          <div>
            <Label htmlFor="propertyTypeInput">Property Type</Label>
            <Select
              name="propertyType"
              onValueChange={handleEstateChange}
              value={realEstate.propertyType}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="House">House</SelectItem>
                <SelectItem value="Apartment">Apartment</SelectItem>
                <SelectItem value="Villa">Villa</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="priceInput">Price</Label>
            <Input
              id="priceInput"
              type="text"
              name="price"
              placeholder="price"
              value={realEstate.price}
              onChange={handelFormChange}
            />
          </div>

          <div>
            <Label htmlFor="sizeInput">size</Label>
            <Input
              id="sizeInput"
              type="text"
              name="size"
              placeholder="size of the property"
              value={realEstate.size}
              onChange={handelFormChange}
            />
          </div>
          <div>
            <Label htmlFor="bedroomsInput">bedrooms</Label>
            <Input
              id="bedroomsInput"
              type="text"
              name="bedrooms"
              placeholder="Number of bedrooms"
              value={realEstate.bedrooms}
              onChange={handelFormChange}
            />
          </div>
          <div>
            <Label htmlFor="bathroomsInput">bathrooms</Label>
            <Input
              id="bathroomsInput"
              type="text"
              name="bathrooms"
              placeholder="Number of bathrooms"
              value={realEstate.bathrooms}
              onChange={handelFormChange}
            />
          </div>

          <div>
            <Label>Furnishing status</Label>
            <Select
              name="furnishingStatus"
              onValueChange={handlefurnitureChange}
              value={realEstate.furnishingStatus}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Fully Furnished">Fully Furnished</SelectItem>
                <SelectItem value="Semi-Furnished">Semi-Furnished</SelectItem>
                <SelectItem value="Unfurnished">Unfurnished</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="featuresInput">features</Label>
            <Input
              id="featuresInput"
              type="text"
              name="features"
              placeholder="Number of bathrooms"
              value={realEstate.features}
              onChange={handelFormChange}
            />
          </div>

          <div>
            <Label htmlFor="amenitiesInput">amenities</Label>
            <Input
              id="amenitiesInput"
              type="text"
              name="amenities"
              placeholder="amenities"
              value={realEstate.amenities}
              onChange={handelFormChange}
            />
          </div>
          <div>
            <Label htmlFor="agentOwnerNameInput">agentOwnerName</Label>
            <Input
              id="agentOwnerNameInput"
              type="text"
              name="agentOwnerName"
              placeholder="agentOwnerName"
              value={realEstate.agentOwnerName}
              onChange={handelFormChange}
            />
          </div>
          <div>
            <Label htmlFor="contactNumberInput">contactNumber</Label>
            <Input
              id="contactNumberInput"
              type="text"
              name="contactNumber"
              placeholder="contactNumber"
              value={realEstate.contactNumber}
              onChange={handelFormChange}
            />
          </div>
          <div>
            <Label htmlFor="emailInput">Email</Label>
            <Input
              id="emailInput"
              type="text"
              name="emailId"
              placeholder="email"
              value={realEstate.emailId}
              onChange={handelFormChange}
            />
          </div>
          <div>
            <Label htmlFor="locationInput">location</Label>
            <Input
              id="locationInput"
              type="text"
              name="location"
              placeholder="enter location"
              value={realEstate.location}
              onChange={handelFormChange}
            />
          </div>
          <div>
            <Label htmlFor="customMessageInput">Custom message</Label>
            <Input
              id="customMessageInput"
              type="text"
              name="customMessage"
              placeholder="Enter your custom message"
              value={realEstate.customMessage}
              onChange={handelFormChange}
            />
          </div>
        </div>

        <div>
          <div>
            <Label htmlFor="backgroundColorInput">Background Color</Label>
            <Input
              id="backgroundColorInput"
              type="color"
              value={options.backgroundOptions?.color}
              onChange={(e) =>
                handleOptionChange("backgroundOptions", {
                  color: e.target.value,
                })
              }
              className="w-20"
            />
          </div>
          <div>
            <Label>dotsOptions Color</Label>
            <Input
              type="color"
              value={options.dotsOptions?.color}
              onChange={(e) =>
                handleOptionChange("dotsOptions", {
                  ...options.dotsOptions,
                  color: e.target.value,
                })
              }
            />
          </div>
          <div>
            <Label>cornersDotOptions Color</Label>
            <Input
              type="color"
              value={options.cornersDotOptions?.color}
              onChange={(e) =>
                handleOptionChange("cornersDotOptions", {
                  color: e.target.value,
                })
              }
            />
          </div>
          <div>
            <Label>cornersSquareOptions Color</Label>
            <Input
              type="color"
              value={options.cornersSquareOptions?.color}
              onChange={(e) =>
                handleOptionChange("cornersSquareOptions", {
                  color: e.target.value,
                })
              }
            />
          </div>

          <div>
            <Label>Corner Square Type</Label>
            <Select
              value={options.cornersSquareOptions?.type}
              onValueChange={(e) =>
                handleOptionChange("cornersSquareOptions", {
                  ...options.cornersSquareOptions,
                  type: e as CornerSquareType,
                })
              }
            >
              {" "}
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="square">Square</SelectItem>
                <SelectItem value="dot">Dot</SelectItem>
                <SelectItem value="extra-rounded">Extra Rounded</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Corner Dot Type</Label>
            <Select
              value={options.cornersDotOptions?.type}
              onValueChange={(e) =>
                handleOptionChange("cornersDotOptions", {
                  ...options.cornersDotOptions,
                  type: e as CornerDotType,
                })
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="square">Square</SelectItem>
                <SelectItem value="dot">dot</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Label> Dot Type</Label>
          <Select
            value={options.dotsOptions?.type}
            onValueChange={(e) =>
              handleOptionChange("dotsOptions", {
                ...options.dotsOptions,
                type: e as DotType,
              })
            }
          >
            {" "}
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dots">Dot</SelectItem>
              <SelectItem value="rounded"> Rounded</SelectItem>
              <SelectItem value="classy">Classy</SelectItem>
              <SelectItem value="square">Square</SelectItem>
              <SelectItem value="extra-rounded">Extra Rounded</SelectItem>
              <SelectItem value="classy-rounded">Classy-Rounded</SelectItem>
            </SelectContent>
          </Select>
          <LogoOptions
            logo={logo}
            onLogoSelect={onLogoSelect}
            onFileChange={handleFileChange}
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center md:sticky md:top-5 md:self-start md:w-1/3 m-5 md:m-0">
        <div ref={ref} className="mb-5 md:mb-5 m-5"></div>
        <div className="text-center md:flex-col justify-center items-center my-5">
          <Select onValueChange={onExtensionChange} value={fileExt}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="svg">SVG</SelectItem>
              <SelectItem value="png">PNG</SelectItem>
              <SelectItem value="jpeg">JPEG</SelectItem>
              <SelectItem value="webp">WEBP</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={onDownloadClick}>Download</Button>
        </div>
      </div>
    </div>
  );
}

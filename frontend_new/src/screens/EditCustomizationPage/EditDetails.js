import { Stack, Button } from "@mui/material";
import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  getSingleTemplate,
  isLoading,
  openSnackbar,
  setEventDetailsPreviewData,
  setEventTemplate,
  setUnsavedStatus,
} from "../../redux/action/userActions";
import { useEffect } from "react";
import {
  setPageTitle,
  setTempTemplateData,
} from "../../redux/action/defaultActions";
import SingleInput from "../CustomizationPage/SingleInput";
import { Constants } from "../../redux/constants/action-types";
import dayjs from "dayjs";

const EditDetails = (props) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log("id=>", id);

  const [eventDetailsData, setEventDetailsData] = useState({
    name: "",
    hostName: "",
    venue: "",
    address: "",
    date: "",
    additionalInfo: "",
    time: "",
  });
  const [timeZone, setTimeZone] = useState({ timezone: "", offset: "" });
  const { userEventTemplate, unsaved } = useSelector((state) => state);

  console.log("userEventTemplate =>", userEventTemplate);

  // submit event details and create template variation along with event creation
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(`${Constants.URL}/event/${id}`, {
        ...eventDetailsData,
      });
      if (res.status === 200) {
        dispatch(openSnackbar(res.data.message, "success"));
        props.tabChange({}, 2);
      }
    } catch (error) {
      console.log("error=>", error);
    }
  };
  // =================================
  const getTimezone = () => {
    const offset = new Date().getTimezoneOffset();
    const hours = Math.floor(Math.abs(offset) / 60);
    const minutes = Math.abs(offset) % 60;
    const sign = offset < 0 ? "+" : "-";
    setTimeZone({
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      offset: `GMT ${sign}${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`,
    });
  };
  const getTemplate = async () => {
    dispatch(isLoading(true));
    const res = await axios.get(`${Constants.URL}/event/${id}`);
    console.log("editRes=>", res);
    dispatch(getSingleTemplate(res?.data?.event));

    setEventDetailsData({
      name: res?.data?.event?.name,
      hostName: res?.data?.event?.hostName,
      venue: res?.data?.event?.venue,
      address: res?.data?.event?.address,
      date: `${dayjs(res?.data?.event?.date).format("YYYY-MM-DD")}`,
      additionalInfo: res?.data?.event?.additionalInfo,
      time: `${dayjs(res?.data?.event?.date).format("HH:MM")}`,
    });
    dispatch(
      setEventTemplate({
        // tempPreviewImage: res?.data?.event?.variation?.previewImage,
        // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSshrGc3H1tmJPwlIDts0DaK67hMU45v6NH6y_5txdY&s"
        tempPreviewImage:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSshrGc3H1tmJPwlIDts0DaK67hMU45v6NH6y_5txdY&s",
      })
    );
    dispatch(setPageTitle(`Edit ${res?.data?.event?.name}`));
    const dt = new Date(res?.data?.event?.date);
    console.log("userEventTamplate=>", userEventTemplate);
    dt.setHours(
      `${dayjs(res?.data?.event?.date).format("HH:MM")}`.split(":")[0],
      `${dayjs(res?.data?.event?.date).format("HH:MM")}`.split(":")[1]
    );
    dispatch(
      setEventTemplate({
        ...userEventTemplate,
        eventDetails: {
          name: res?.data?.event?.name,
          hostName: res?.data?.event?.hostName,
          venue: res?.data?.event?.venue,
          address: res?.data?.event?.address,
          date: `${dayjs(res?.data?.event?.date).format("YYYY-MM-DD")}`,
          additionalInfo: res?.data?.event?.additionalInfo,
          time: `${dayjs(res?.data?.event?.date).format("HH:MM")}`,
          dateFormat: dt,
        },
      })
    );
    // setTempTemplateData(JSON.parse(res?.data?.event?.variation?.variationJson));

    dispatch(isLoading(false));
  };
  useEffect(() => {
    getTimezone();
    getTemplate();
    if (userEventTemplate?.eventDetails) {
      setEventDetailsData(userEventTemplate?.eventDetails);
    }
  }, []);

  return (
    <Stack>
      {/* == 👇 form container 👇  ==*/}
      <Stack component={"form"} onSubmit={submitHandler}>
        {/* == 👇 event Name 👇  ==*/}
        <SingleInput
          labelText={"Event Name"}
          inputType={"text"}
          inputName={"eventName"}
          labelInputId={"eventName"}
          inputValue={eventDetailsData?.name || ""}
          onChangeHandler={(e) => {
            setEventDetailsData({
              ...eventDetailsData,
              ["name"]: e.target.value,
            });
            dispatch(setUnsavedStatus(true));
          }}
          requiredTrue={true}
          placeholderText={"e.g. Wedding"}
        />
        {/* == 👆 event Name 👆   ==*/}
        {/* == 👇 event Name 👇  ==*/}
        <SingleInput
          labelText={"Sender Name"}
          inputType={"text"}
          inputName={"senderName"}
          labelInputId={"senderName"}
          inputValue={eventDetailsData?.hostName || ""}
          onChangeHandler={(e) => {
            setEventDetailsData({
              ...eventDetailsData,
              ["hostName"]: e.target.value,
            });
            dispatch(setUnsavedStatus(true));
          }}
          requiredTrue={true}
          placeholderText={"Your name"}
        />

        <SingleInput
          labelText={"Venue Name"}
          inputType={"text"}
          inputName={"venueName"}
          labelInputId={"venueName"}
          inputValue={eventDetailsData?.venue || ""}
          onChangeHandler={(e) => {
            setEventDetailsData({
              ...eventDetailsData,
              ["venue"]: e.target.value,
            });
            dispatch(setUnsavedStatus(true));
          }}
          requiredTrue={true}
          placeholderText={"e.g. Le Jardin"}
        />
        {/* == 👆 venue Name 👆   ==*/}
        {/* == 👇 venue Address 👇  ==*/}
        <SingleInput
          labelText={"Venue Address"}
          inputType={"text"}
          inputName={"venueAddress"}
          inputValue={eventDetailsData?.address || ""}
          onChangeHandler={(e) => {
            setEventDetailsData({
              ...eventDetailsData,
              ["address"]: e.target.value,
            });
            dispatch(setUnsavedStatus(true));
          }}
          labelInputId={"venueAddress"}
          requiredTrue={true}
          placeholderText={"Full address here"}
        />
        {/* == 👆 venue Address 👆   ==*/}
        {/* == 👇Event date 👇  ==*/}
        <SingleInput
          labelText={"Event Date"}
          inputType={"date"}
          inputName={"date"}
          inputValue={eventDetailsData?.date || ""}
          onChangeHandler={(e) => {
            setEventDetailsData({
              ...eventDetailsData,
              ["date"]: e.target.value,
            });
            dispatch(setUnsavedStatus(true));
          }}
          labelInputId={"eventDate"}
          requiredTrue={true}
          placeholderText={""}
        />
        {/* == 👆Event date👆   ==*/}
        {/* == 👇Event time 👇  ==*/}
        <SingleInput
          labelText={"Event time"}
          inputType={"time"}
          inputName={"time"}
          inputValue={eventDetailsData?.time || ""}
          onChangeHandler={(e) => {
            setEventDetailsData({
              ...eventDetailsData,
              ["time"]: e.target.value,
            });
            dispatch(setUnsavedStatus(true));
          }}
          labelInputId={"time"}
          requiredTrue={true}
          placeholderText={""}
          helperText={`Timezone : (${timeZone?.offset}) ${timeZone?.timezone}`}
        />
        {/* == 👆Event time👆   ==*/}
        {/* == 👇Additional Information for Location 👇  ==*/}
        <SingleInput
          labelText={"Additional Information for Location"}
          inputType={"textarea"}
          inputName={"additionalInfo"}
          inputValue={eventDetailsData?.additionalInfo || ""}
          onChangeHandler={(e) => {
            setEventDetailsData({
              ...eventDetailsData,
              ["additionalInfo"]: e.target.value,
            });
            dispatch(setUnsavedStatus(true));
          }}
          labelInputId={"additionalInfo"}
          requiredTrue={true}
          placeholderText={"e.g. North of the Swan Lake"}
          rows={"3"}
        />
        {/* == 👆Additional Information for Location👆   ==*/}
        {/* </Stack> */}
        {/* == 👆 fieldset to group inputs together for location 👆   ==*/}
        <Button
          type="submit"
          disableElevation
          disabled={unsaved ? false : true}
          variant="contained"
          sx={{ color: "#fff", mt: 1 }}
        >
          UPDATE AND SAVE
        </Button>
        <Button
          // type="submit"
          disabled={unsaved ? true : false}
          disableElevation
          onClick={() => props.tabChange({}, 2)}
          variant="contained"
          sx={{ color: "#fff", mt: 1 }}
        >
          NEXT
        </Button>
      </Stack>
      {/* <Button onClick={() => navigate(`/dashboard/preview/${singleEvent._id}`)} disableElevation variant="contained" sx={{ color: "#fff" }}>
         //       Next
          </Button> */}
      {/* <>
         <Preview hostName={jack}/>
         </> */}
      {/* == 👆 form container 👆   ==*/}
    </Stack>
  );
};

export default EditDetails;

// onClick={navigate(`/dashboard/ok/${event?._id}`)}

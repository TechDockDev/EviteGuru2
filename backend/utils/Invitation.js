import * as React from "react";
import { AiOutlineMessage } from "react-icons/ai";

// import Nevbar from '../Component/image/evitguru-logo.jpg'
const Invitation = (props) => {
  const { url } = props;

  return (
    <div>
      {/* inner container portion  */}
      <div className=" border-4 rounded bg-#cec5dc ">
        <div>
          <img src="evitguru-logo.svg" style={{ width: 200 }} alt="logo" />
        </div>
        <div className=" invitation d-flex flex-column align-items-center  border border-4 rounded ">
          <p className="my-4 "> you're invited to: </p>
          <h3 className="my-5">Marrige</h3>
          <button
            className="btn-1 border border-4 my-5 rounded-pill bs-btn-background-color:#cec5dc"
            type="text"
            placeholder="View And Reply "
            style={mystyle}
          >
            View And Reply
          </button>
        </div>
        {/* Not sure you can make it text section    */}
        <div className="Bottom-part  d-flex flex-column align-items-center mt-5">
          <h6> Not sure you can make it? </h6>
          <span
            className=" d-flex flex-row justyfy-content-center align-items-center"
            style={{ cursor: "pointer" }}
          >
            <AiOutlineMessage />
            <p> Message the host </p>
          </span>
        </div>
        <div className="last-img-portion">
          <img src="" />
          <img src="" />
        </div>
        {/* footer section */}
        <div className=" px-5 py-3">
          <p>
            For the best evitguru.com, please add evitguru@.com to your address
            book; this will guarantee that you receive all invitations and cards
            in your email inbox. Block an email to address to stop receiving
            evitguru mail from a specific sender or unsubscribe to stop
            receiving emails from Evitguru entirely, including all invitations
            and cards. Learn more about our privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Invitation;

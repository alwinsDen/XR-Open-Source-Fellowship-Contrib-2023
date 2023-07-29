// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.scss";
import AddImage from "../../../../../assets/svgs/add-image (1) 1.svg";
import AddConfig from "../../../../../assets/svgs/AddConfig.svg";
import {
  setFirstLoad,
  updateUnUsedObjects,
} from "../../../../../redux/savedConfigs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast } from "react-hot-toast";
import { WhiteOnRed } from "../SectionFive/CommentBox";
import CustomPopUp from "../../components/CustomPopUp";
import MeshSelectPresets from "../../components/MeshSelectPresets";

const SectionThree = () => {
  const materialArray = useSelector(
    (state: any) => state.materialControl.materialArray
  );
  const { presets, unUsedObjects, firstLoad } = useSelector(
    (state) => state.savedConfigs
  );
  const [currentPreset, setCurrentPreset] = useState("");
  const [toggleAdd, setToggleAdd] = useState(false);
  const dispatch = useDispatch();
  const [reqPreset, setReqPreset] = useState(null);

  //this here is a sophisticated loading mechanism for the visibility factors
  //This simplimfy the operation reduce the 3 foreach 0N>3,  - optional
  useEffect(() => {
    if (materialArray.length && reqPreset) {
      reqPreset.forEach((prVal, index) => {
        prVal.materialList.forEach((matName, matIndex) => {
          //now toggle the visibility
          materialArray.forEach((modMaterial, modIndex) => {
            if (modMaterial.name === matName) {
              modMaterial.visible = prVal.visibility[matIndex];
            }
          });
        });
      });
    }
  }, [materialArray, reqPreset]);

  useEffect(() => {
    if (firstLoad && materialArray.length) {
      let materialNameList = [];
      materialArray.forEach((vls) => {
        materialNameList.push(vls.name);
      });
      dispatch(updateUnUsedObjects(materialNameList));
      dispatch(setFirstLoad(false));
    }
  }, [firstLoad, materialArray, dispatch]);

  //here are the states of the of the userID and projectID
  const { userID, projectID } = useSelector(
    (state: any) => state.accountManagement
  );
  const [presetState, setPresetState] = useState(false);
  const presetStateConfig = useSelector(
    (state) => state.materialApplication.presetState
  );
  // check whether the preset already exists
  useEffect(() => {
    if (projectID && presetStateConfig) {
      axios
        .get("/materials/getpreset", {
          params: {
            projectId: projectID,
            userId: userID,
          },
        })
        .then((res) => {
          setReqPreset(res.data.preset.configuration.preset);
        })
        .catch((err) => {
          toast.error(err);
        });
    }
  }, [projectID, userID, presetStateConfig]);

  const StopPreset = () => {
    useEffect(() => {
      materialArray.forEach((modMaterial, modIndex) => {
        modMaterial.visible = true;
      });
    }, []);
    return (
      <div
        style={{
          marginTop: "25px",
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "15px",
          }}
          className={"midBoldclass"}
        >
          Enable Preset configuration
        </p>
      </div>
    );
  };

  return presetStateConfig ? (
    <div className={"sectionThreeDiv"}>
      {presetState && (
        <CustomPopUp
          header={"Enter Preset Name"}
          placeholder={"Preset name"}
          onCancel={() => {
            setPresetState(false);
          }}
          onSubmit={(name) => {
            let innerObject = {
              name,
              materialList: [],
              visibility: [],
            };
            setCurrentPreset(name);
            setReqPreset((stateReq) => [...stateReq, innerObject]);
            setToggleAdd((state) => !state);
            setPresetState(false);
          }}
        />
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          margin: "36px 0 6px 0",
          justifyContent: "space-between",
        }}
      >
        <p className={"sectionThreeTitle"}>Preset</p>
        <img
          alt=""
          src={AddConfig}
          onClick={() => {
            setPresetState(true);
          }}
          style={{ width: "21.35px" }}
        />
      </div>
      {/*here is the material selection section*/}
      {toggleAdd && (
        <MeshSelectPresets
          unSelectedObjects={unUsedObjects}
          current={currentPreset}
          setReqPreset={setReqPreset}
          reqPreset={reqPreset}
          setToggleAdd={setToggleAdd}
        />
      )}
      <div>
        {(reqPreset ? reqPreset : presets).map((preset) => {
          return (
            <div className={"configBox"}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "0 15px 10px 15px",
                  alignItems: "center",
                }}
              >
                <p className={"configHead"}>{preset.name}</p>
                <img
                  alt=""
                  onClick={() => {
                    setCurrentPreset(preset.name);
                    setToggleAdd((state) => !state);
                  }}
                  src={AddImage}
                  style={{ width: "20px" }}
                />
              </div>
              <div>
                {preset.materialList.map((matVal, matInx) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        cursor: "pointer",
                        height: "22px",
                        background: "rgba(244, 244, 244, 0.90)",
                        border: "1px solid #E3E3E3",
                        borderRadius: "5px",
                        margin: "0 15px 10px 15px",
                        padding: "0 9px",
                      }}
                    >
                      <p className={"confName midBoldclass"}>{matVal}</p>
                      <FontAwesomeIcon
                        icon={preset.visibility[matInx] ? faEye : faEyeSlash}
                        style={{ fontSize: "12px", color: "#000000" }}
                        onClick={() => {
                          materialArray.forEach((matArr) => {
                            if (matArr.name === matVal) {
                              matArr.visible = !preset.visibility[matInx];
                            }
                          });

                          setReqPreset((presState) =>
                            presState.map((presetChng) => {
                              if (presetChng.name === preset.name) {
                                let materialIndex =
                                  presetChng.materialList.indexOf(matVal);
                                presetChng.visibility[materialIndex] =
                                  !preset.visibility[matInx];
                                return presetChng;
                              }
                              return presetChng;
                            })
                          );
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className={"DupDelDiv"}>
        <WhiteOnRed
          // className={"uploadAsset"}
          style={{ width: "40%" }}
          onClick={() => {
            axios
              .put("/materials/preset", {
                presetName: "Preset",
                configuration: {
                  preset: reqPreset,
                },
                projectId: projectID,
                userId: userID,
              })
              .then((res) => {
                toast.success("Successfully updated the preset.");
              });
          }}
        >
          Save
        </WhiteOnRed>
        <WhiteOnRed style={{ width: "60%" }}>Cancel</WhiteOnRed>
      </div>
    </div>
  ) : (
    <StopPreset />
  );
};
export default SectionThree;

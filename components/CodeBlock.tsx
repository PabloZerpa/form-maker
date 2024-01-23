
import useDesigner from "./hooks/useDesigner";
import { FaCode, FaCopy } from "react-icons/fa";
import { FormElementInstance } from "./FormElements";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Tooltip } from "react-daisyui";
import { notify } from "@/libs/notify";
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import SyntaxHighlighter from 'react-syntax-highlighter';
import Window from "./Window";

function PreviewDialogBtn() {
  const { elements } = useDesigner();
  const [code, setCode] = useState('');

  let codigo = `<form 
    className="max-w-[620px] flex flex-col flex-grow 
    gap-8 bg-zinc-800 h-full w-full rounded-2xl p-8 overflow-y-auto">`;

  const codeTemplate = (type: string, element : FormElementInstance) => {
    
    if(type=="textarea"){
      return `
        <label htmlFor="input" className='ml-1 text-sm'>
            ${element.extraAttributes?.label}
            ${element.extraAttributes?.required ? ("*") : ("")}
        </label>

        <textarea 
          className="p-3 bg-[#191E24] text-[#E0E0E0] border-solid 
            border border-[#939393] rounded-lg outline-none"
          placeholder=${element.extraAttributes?.placeHolder}
          id="input" 
          name="input" 
          required 
          readOnly
          disabled
        />

        ${element.extraAttributes?.helperText && 
          <label htmlFor="input" className='ml-1 text-xs'>
            ${element.extraAttributes?.helperText}
          </label> 
        }
      `
    }
    if(type=="range"){
      return `
        <label htmlFor="input" className='ml-1 text-sm'>
            ${element.extraAttributes?.label}
            ${element.extraAttributes?.required ? ("*") : ("")}
        </label>

        <input 
          className="p-3 bg-[#191E24] text-[#E0E0E0] border-solid 
          border border-[#939393] rounded-lg outline-none"
          type="range" 
          id="input-range" 
          name="input-range" 
          min=${element.extraAttributes?.min}
          max=${element.extraAttributes?.max}
          step={10}
          disabled
        />

        ${element.extraAttributes?.min && 
          <label className="label">
            <span className="label-text-alt text-muted-foreground text-[0.8rem]">
              {element.extraAttributes?.min}
            </span>
          </label>
        }
      `
    }
    if(type=="rating"){
      return `
        <label htmlFor="input" className='ml-1 text-sm'>
            ${element.extraAttributes?.label}
            ${element.extraAttributes?.required ? ("*") : ("")}
        </label>

        <div className="App">
          {[...Array(Number(amount))].map((star, index) => {
            const currentRating = index + 1;

            return (
              <label key={index}>
                <input
                  key={star}
                  type="radio"
                  name="rating"
                  className="hidden"
                  value={currentRating}
                  onChange={() => setRating(currentRating)}
                />
                <span
                  className='star mr-2 text-4xl cursor-pointer'
                  style={{ color: currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9", }}
                  onMouseEnter={() => setHover(currentRating)}
                  onMouseLeave={() => setHover(null)}
                >
                  ★
                </span>
              </label>
            );
          })}
        </div>

        ${element.extraAttributes?.min && 
          <label className="label">
            <span className="label-text-alt text-muted-foreground text-[0.8rem]">
              {element.extraAttributes?.min}
            </span>
          </label>
        }
      `
    }
    if(type=="pin"){
      
      const pinAmount = () => {
        let pins = [''];
        for (let i = 1; i <= Number(element.extraAttributes?.amount); i++) {
          pins.push(
            `
              <input 
                className="w-14 p-2 bg-[#191E24] text-[#E0E0E0] 
                border-solid border border-[#939393] rounded-lg outline-none" 
                type="password" 
                maxLength={1} 
                onPaste={(e) => {
                  const paste = e.clipboardData.getData('text');
                  e.currentTarget.value = paste[i] || '';
                }}
              />
            `
          );
        }
        return pins;
      };

      return `
        <div className="flex flex-col gap-2 w-80">
          <label htmlFor="input" className='ml-1 text-sm'>
            ${element.extraAttributes?.label}
            ${element.extraAttributes?.required ? ("*") : ("")}
          </label>

          <div className="flex flex-col gap-2">
            <form className="flex gap-2">
              ${element.extraAttributes?.amount && pinAmount()}
            </form>
          </div>

          ${element.extraAttributes?.helperText && 
            <label htmlFor="input" className='ml-1 text-xs'>
              ${element.extraAttributes?.helperText}
            </label> 
          }
        </div>
      `
    }

    if(type=="button"){
      return `
        <div 
          className="flex w-full component-preview p-4 
          items-center justify-start gap-2 font-sans"
        >
          <button 
            type={btnType} 
            className="w-auto rounded-md bg-[#191E24] text-[#E0E0E0] 
            p-2 transition duration-200 ease-in-out hover:bg-[#3d444c]"
        >
            ${element.extraAttributes?.title}
          </button>
        </div>
      `
    }
    if(type=="separator"){
      return `
        <div className="divider"></div>
      `
    }
    if(type=="title"){
      return `
        <p className="text-xl">${element.extraAttributes?.title}</p>
      `
    }
    if(type=="subtitle"){
      return `
        <p className="text-base">${element.extraAttributes?.title}</p>
      `
    }
    if(type=="paragraph"){
      return `
        <p className="text-muted-foreground">${element.extraAttributes?.text}</p>
      `
    }
    if(type=="select"){

      const selectOptions = () => {
        let opt = [''];

        element.extraAttributes?.options.map((option:string) => {
          opt.push(
            `
              <option value=${JSON.stringify(option)}>
                ${JSON.stringify(option)}
              </option>
            `
          );
        });

        return opt;
      };

      return `
        <div 
          className="flex w-full component-preview p-4 
          items-center justify-start gap-2 font-sans"
        >
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span>
                ${element.extraAttributes?.label}
                ${element.extraAttributes?.required ? ("*") : ("")}
              </span>
            </label>

            <select className="select select-bordered w-full max-w-xs">
              
              <option disabled selected value="">
                Select an option
              </option>

              ${element.extraAttributes?.options && selectOptions()}
              
            </select>
            
            <label htmlFor="input" className='ml-1 text-xs'>
              ${element.extraAttributes?.helperText}
            </label> 
          </div>
        </div>
      `
    }

    if(type=="checkbox"){

      const checkBoxes = () => {
        let check = [''];

        element.extraAttributes?.options.map((option:string) => {
          check.push(
            `
            <div className="flex flex-col gap-2">
              <label htmlFor=${JSON.stringify(option)}>
                ${JSON.stringify(option)}
              </label>
              <input
                id=${JSON.stringify(option)}
                type="checkbox"
                className="checkbox"
              />
            </div>
            `
          );
        });
        
        return check;
      };

      return `
        <div 
          className="flex w-full component-preview p-4 
          items-center justify-start gap-2 font-sans"
        >
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span>
                ${element.extraAttributes?.label}
                ${element.extraAttributes?.required ? ("*") : ("")}
              </span>
            </label>

            <div className="flex gap-4">
              ${element.extraAttributes?.options && checkBoxes()}
            </div>
            
            <label htmlFor="input" className='ml-1 text-xs'>
              ${element.extraAttributes?.helperText}
            </label> 
          </div>
        </div>
      `
    }

    if(type=="radio"){

      const radioBtns = () => {
        let radios = [''];

        element.extraAttributes?.options.map((option:string) => {
          radios.push(
            `
            <div className="flex flex-col gap-2">
              <label htmlFor=${JSON.stringify(option)} >
                ${JSON.stringify(option)}
              </label>
              <input 
                type="radio" 
                name="radiobtn" 
                className="radio" 
                value=${JSON.stringify(option)} 
              />
            </div>
            `
          );
        });
        
        return radios;
      };

      return `
        <div 
          className="flex w-full component-preview p-4 
          items-center justify-start gap-2 font-sans"
        >
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span>
                ${element.extraAttributes?.label}
                ${element.extraAttributes?.required ? ("*") : ("")}
              </span>
            </label>

            <div className="flex gap-4">
              ${element.extraAttributes?.options && radioBtns()}
            </div>
            
            <label htmlFor="input" className='ml-1 text-xs'>
              ${element.extraAttributes?.helperText}
            </label> 
          </div>
        </div>
      `
    }

    return `
      <div className="flex flex-col gap-2 w-80">
        <label htmlFor="input" className='ml-1 text-sm'>
            ${element.extraAttributes?.label}
            ${element.extraAttributes?.required ? ("*") : ("")}
        </label>

        <input 
          className="p-3 bg-[#191E24] text-[#E0E0E0] 
          border-solid border border-[#939393] rounded-lg outline-none"
          type=${type}
          placeholder=${element.extraAttributes?.placeHolder}
          id="input" 
          name="input" 
          value={value}
          required 
          onChange={(e) => setValue(e.target.value)}
          onBlur={(e) => {
              if (!submitValue) return;
              const valid = TextFieldFormElement.validate(
                element, e.target.value);
              setError(!valid);
              if (!valid) return;
              submitValue(element.id, e.target.value);
          }}
        />
        <label htmlFor="input" className='ml-1 text-xs'>
          ${element.extraAttributes?.helperText}
        </label>
      </div>
    `
  };

  useEffect(() => {
    
    elements.map((element) => {

      if(element.type === "TitleField"){
        codigo = codigo + codeTemplate('title', element);
      }
      else if(element.type === "SubTitleField"){
        codigo = codigo + codeTemplate('subtitle', element);
      }
      else if(element.type === "ParagraphField"){
        codigo = codigo + codeTemplate('paragraph', element);
      }
      else if(element.type === "SeparatorField"){
        codigo = codigo + codeTemplate('separator', element);
      }
      else if(element.type === "TextField"){
        codigo = codigo + codeTemplate('text', element);
      }
      else if(element.type === "NumberField"){
        codigo = codigo + codeTemplate('number', element);
      }
      else if(element.type === "EmailField"){
        codigo = codigo + codeTemplate('email', element);
      }
      else if(element.type === "UrlField"){
        codigo = codigo + codeTemplate('url', element);
      }
      else if(element.type === "TimeField"){
        codigo = codigo + codeTemplate('time', element);
      }
      else if(element.type === "PhoneField"){
        codigo = codigo + codeTemplate('tel', element);
      }
      else if(element.type === "PasswordField"){
        codigo = codigo + codeTemplate('password', element);
      }
      else if(element.type === "PinField"){
        codigo = codigo + codeTemplate('pin', element);
      }
      else if(element.type === "DateField"){
        codigo = codigo + codeTemplate('date', element);
      }
      else if(element.type === "InputFileField"){
        codigo = codigo + codeTemplate('file', element);
      }
      else if(element.type === "RangeField"){
        codigo = codigo + codeTemplate('range', element);
      }
      else if(element.type === "RatingField"){
        codigo = codigo + codeTemplate('rating', element);
      }
      else if(element.type === "TextAreaField"){
        codigo = codigo + codeTemplate('textarea', element);
      }
      else if(element.type === "ButtonField"){
        codigo = codigo + codeTemplate('button', element);
      }
      else if(element.type === "SelectField"){
        codigo = codigo + codeTemplate('select', element);
      }
      else if(element.type === "CheckboxField"){
        codigo = codigo + codeTemplate('checkbox', element);
      }
      else if(element.type === "RadioField"){
        codigo = codigo + codeTemplate('radio', element);
      }
    });

    codigo = codigo + `</form>`;
    setCode(codigo);

  }, [elements]);

  return (
    <Window
      label="Code"
      sizeButton=""
      icon={<FaCode className="h-6 w-6" />}
      title="Form Code"
      description=""
    >
    <ToastContainer />
      <div className="w-screen h-screen max-h-screen max-w-full flex flex-col flex-grow p-0 gap-0">

        <div 
          className="flex flex-col flex-grow items-center justify-start p-4 overflow-y-auto"
        >
          {code && (
            <div className="p-2 bg-gray-900 rounded-lg overflow-y-auto">

              <div className="flex items-center justify-end">
                <Tooltip message="Copy" position="left" >
                  <FaCopy 
                    className="h-6 w-6 text-blue-600 hover:text-blue-500 cursor-pointer" 
                    onClick={() => {
                      navigator.clipboard.writeText(code);
                      notify("Copied!", "success");
                    }}
                  />
                </Tooltip>
              </div>

              <SyntaxHighlighter 
                language="javascript" 
                style={atomOneDark}
                showLineNumbers
                wrapLongLines
                customStyle={{background: "none"}}
              >
                {code}
              </SyntaxHighlighter>
              
            </div>
          )}

        </div>
      </div>
    </Window>
  );
}

export default PreviewDialogBtn;
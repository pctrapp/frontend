import { NextPage } from 'next';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';

import { colors, typography } from '../atoms/constans';
import Anchor from '../components/Anchor';
import Button from '../components/Button';
import DefaultHead from '../components/DefaultHead';
import core from '../core';
import { ALERT } from '../core/events';
import { IUser, IFile } from '../types';
import { sleep } from '../lib/utils';
import File from '../components/File';
import { getSession } from '../context/auth';

interface Props {
  user?: IUser,
}

const Upload: NextPage<Props> = ({ user }) => {
  const [files, setFiles] = useState<IFile[]>([]);

  const { getRootProps, getInputProps, inputRef } = useDropzone({
    accept: '.jpg,.jpeg,.png',
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > 5) {
        ALERT.emit({ title: 'You can only upload five images at a time', type: 'error' });
        return;
      }

      setFiles(
        acceptedFiles.map((f) => { return { file: f } }),
      );      
      for (let i = 0; i < acceptedFiles.length; i += 1) {
        await uploadFile(acceptedFiles[i], i);
        await sleep(700);
      }
    },
    onDropRejected: () => {
      ALERT.emit({ title: 'Invalid file type', type: 'error' });
    }
  });

  async function uploadFile(f: File, i: number) {
    if (!f) return;

    const sizeInMb = f.size / (1024 * 1024);
    if (sizeInMb > 5) {
      setFiles((x) => {
        return [...x.map((y, index) => {
          if (index === i) return { ...y, response: { message: 'Maximum file size exceeded' } };
  
          return y;
        })];
      });
      ALERT.emit({ title: 'Maximum file size exceeded', type: 'error' });
      return;
    }

    if (!['png', 'jpeg', 'jpg'].includes(f.name.split('.').pop() || '')) {
      setFiles((x) => {
        return [...x.map((y, index) => {
          if (index === i) return { ...y, response: { message: 'Invalid file type' } };
  
          return y;
        })];
      });
      ALERT.emit({ title: 'Invalid file type', type: 'error' });
      return;
    }
    
    const formData = new FormData();
    formData.append('image', f);
    const response = await core.api
      .post(`images${user ? `?api_key=${user.api_key}` : ''}`, formData);

    if (response.status !== 200) {
      ALERT.emit({ title: response.data.message, type: 'error' });
      setFiles((x) => {
        return [...x.map((y, index) => {
          if (index === i) return { ...y, response: { message: response.data.message } };
  
          return y;
        })];
      });
    } else {
      setFiles((x) => {
        return [...x.map((y, index) => {
          if (index === i) return { ...y, response: { slug: response.data.slug } };
  
          return y;
        })];
      });
    }
  }

  return (
    <>
      <DefaultHead>
        <title>Upload & Share instantly - pctr.app</title>
      </DefaultHead>
      <Wrapper>
        <Box>
          <BoxHeader>
            <typography.h4>Upload & Share</typography.h4>
          </BoxHeader>
          <BoxContent>
            {files.length === 0 ?
              <>
                <DragArea {...getRootProps()}>
                  <input {...getInputProps()} />
                  <typography.p align="center">Drop image here</typography.p>
                  <typography.p margin="0 0 .75rem 0" align="center">or</typography.p>
                  <BoxButton 
                    onClick={() => inputRef.current?.click()}>Select image</BoxButton>
                </DragArea>
              </>
            :
              files.map((file, i) => 
                <File 
                  key={i} 
                  {...file} 
                  username={user?.username} 
                  onDelete={() => setFiles((files) => {
                    files.splice(i, 1);
                    return [...files];
                  })} />
              )
            }
          </BoxContent>
        </Box>
        <typography.s margin="1rem 0 0 0" align="center">
          By uploading an image, you agree to pctr's{' '}
          <Anchor href="/privacy">Privacy Policy</Anchor>.
        </typography.s>
      </Wrapper>
     </>
  )
}

Upload.getInitialProps = async (ctx) => {
  const session = await getSession(ctx);
  return { user: session ? session : undefined };
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  padding: 0 2vw;
`;

const Box = styled('div')`
  background: ${colors.SEC_BG};
  border-radius: 10px;
  width: 100%;
  max-width: 480px;
  box-shadow: ${colors.BOX_SHADOW};
`;

const BoxHeader = styled('div')`
  height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(100% 1000% at 100% 50%, #8A2387 0%, #E94057 50.52%, #F27121 100%);
  border-radius: 10px 10px 0 0;
`;

const BoxContent = styled.div`
  padding: 2rem;
  max-height: 500px;
  overflow: auto;
`;

const DragArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 200px;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='9' ry='9' stroke='%23FFFFFF1C' stroke-width='5' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");  border-radius: 1rem;
`;

const BoxButton = styled(Button)`
  width: 80%;
`;

export default Upload;
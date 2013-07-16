<?php
namespace MaDev\UploadFileBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use MaDev\UploadFileBundle\Entity\File;
/**
 * File controller.
 *
 */
class FileController extends Controller
{
    /**
     * Upload multiple files
     */
    public function uploadAction(Request $request)
    {
        $form = $this->createFormBuilder()
                ->add('name')
                ->add('files', 'file', array('mapped' => false ))
                ->getForm();
        
        if($request->isMethod('POST')){
            $form->bind($request);
            
            if($form->isValid()){
                $data = $form->getData();
                $files = $form['files']->getData();
                
                foreach ($files as $file) {
                    $newfile = $file->move(__DIR__.'/../../../../web/uploads', $file->getClientOriginalName());
                    $new_file = new File;
                    $new_file->setName($file->getClientOriginalName());
                    $em = $this->getDoctrine()->getEntityManager();
                    $em->persist($new_file);
                }
                $em->flush();
            }
        }
        
        
        return $this->render('MaDevUploadFileBundle:File:form_upload.html.twig', array(
            'form'   => $form->createView()
        ));
    }
}
?>

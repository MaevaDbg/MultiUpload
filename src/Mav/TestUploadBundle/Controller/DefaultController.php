<?php

namespace Mav\TestUploadBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('MavTestUploadBundle:Default:index.html.twig', array('name' => $name));
    }
}

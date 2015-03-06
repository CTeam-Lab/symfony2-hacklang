<?php
namespace AdminBundle\Admin;

use Sonata\AdminBundle\Admin\Admin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;

/**
 * @package    hhvm
 * @category   hhvm
 * @author     Jorge Meireles
 * @copyright  (c) 2014 Rocket Internet
 */
class PostAdmin extends Admin
{

    protected $baseRouteName = 'post';
    protected $baseRoutePattern = 'post';

    /**
     * @param FormMapper $formMapper
     */
    protected function configureFormFields(FormMapper $formMapper)
    {
        $formMapper
            ->add('enabled')
            ->add('featured')
            ->add('title')
            ->add('content', null, array('attr' => array('class' => 'ckeditor')))
            ->add('category')
        ;
    }

    /**
     * @param DatagridMapper $datagridMapper
     */
    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper
            ->add('title')
            ->add('category')
            ->add('enabled')
            ->add('featured')
        ;
    }

    /**
     * @param ListMapper $listMapper
     */
    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper
            ->addIdentifier('title')
            ->add('category')
            ->add('enabled')
            ->add('featured')
        ;
    }

    /**
     * @param mixed $post
     * @return mixed
     */
    public function preUpdate($post)
    {
        //$post->setUpdatedAt('now');

        return $post;
    }

    /**
     * @param mixed $post
     * @return mixed
     */
    public function prePersist($post)
    {
        //$post->setCreatedAt('now');
        $user = $this->getConfigurationPool()->getContainer()->get('security.context')->getToken()->getUser();
        $post->setAuthor($user);

        return $this->preUpdate($post);
    }

}

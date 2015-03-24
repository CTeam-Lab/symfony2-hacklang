<?php
namespace Application\Frontend\ClientBundle\Helper;

/**
 * Class AppHelper
 * @package AppBundle\Helper
 */
class AppHelper
{

    /**
     * @static
     * @param  $text
     * @return mixed|string
     */
    public static function slugify($text)
    {
        // replace non letter or digits by -
        $text = preg_replace('~[^\\pL\d]+~u', '-', $text);

        // trim
        $text = trim($text, '-');

        // transliterate
        if (function_exists('iconv')) {
            $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);
        }

        // lowercase
        $text = strtolower($text);

        // remove unwanted characters
        $text = preg_replace('~[^-\w]+~', '', $text);

        if (empty($text)) {
            return 'n-a';
        }

        return $text;
    }

    /**
     * Sets the date this entity was created
     *
     * @throws \InvalidArgumentException
     * @param \DateTime|string|integer $date
     * @return \DateTime
     */
    public static function dateFormat($date)
    {

        if (is_string($date)) {
            $date = new \DateTime($date);
        } else {
            if (is_int($date)) {
                $date = new \DateTime(sprintf('@%d', $date));
            } else {
                if (!$date instanceof \DateTime) {
                    throw new \InvalidArgumentException(
                        sprintf(
                            'Expecting string, integer or DateTime, but got `%s`',
                            is_object($date) ? get_class($date) : gettype($date)
                        )
                    );
                }
            }
        }

        return $date;
    }

    /**
     * Quick debugging of any variable. Any number of parameters can be set.
     * Kohana 3 style.
     *
     * @return  string
     */
    public static function debug()
    {
        if (func_num_args() === 0) {
            return;
        }

        // Get params
        $params = func_get_args();
        $output = array();

        foreach ($params as $var) {
            $output[] = '<pre>(' . gettype($var) . ') ' . html::specialchars(print_r($var, true)) . '</pre>';
        }

        return implode("\n", $output);
    }

}